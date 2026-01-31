from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
load_dotenv()

from utils.ocr import extract_text
from utils.matcher import match_brand
from utils.logo_detector import detect_logo  # Cohere-powered now
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load brands
with open("brands.txt") as f:
    BRANDS = [line.strip() for line in f.readlines()]

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

    # :one: Extract text with OCR
    detected_texts = extract_text(image_path)
    text_result = match_brand(detected_texts, BRANDS)

    # :two: Detect logo with Cohere Vision
    logo_result = detect_logo(image_path)  # returns "Brand" or "NO_LOGO"

    return jsonify({
        "logo_based": logo_result
    })

if __name__ == "__main__":
    app.run(debug=True)