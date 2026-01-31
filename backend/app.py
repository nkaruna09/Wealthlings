from flask import Flask, request, jsonify
import os
from utils.ocr import extract_text
from utils.matcher import match_brand
from utils.logo_detector import detect_logo  # new

from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load brands
with open("brands.txt") as f:
    BRANDS = [line.strip() for line in f.readlines()]

@app.route("/")
def home():
    return "Brand Scanner API is running."

@app.route("/scan", methods=["POST"])
def scan_brand():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    if image.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(image.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(image_path)

    # 1️⃣ Extract text with OCR
    detected_texts = extract_text(image_path)
    text_result = match_brand(detected_texts, BRANDS)

    # 2️⃣ Detect logo / symbols
    logo_result = detect_logo(image_path, "data/logos")  # returns {brand, confidence}

    # Combine results
    final_result = {
        "text_based": text_result,
        "logo_based": logo_result
    }

    return jsonify({
        "detected_text": detected_texts,
        "result": final_result
    })

if __name__ == "__main__":
    app.run(debug=True)
