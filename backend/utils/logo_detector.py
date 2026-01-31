import cv2
import os
import numpy as np

def detect_logo(image_path, logo_folder, threshold=0.7):
    """
    Detect brand logos using template matching.
    
    Returns:
        {"brand": brand_name or None, "confidence": float}
    """
    img = cv2.imread(image_path, cv2.IMREAD_COLOR)
    if img is None:
        return {"brand": None, "confidence": 0}

    best_brand = None
    best_score = 0

    for file in os.listdir(logo_folder):
        if not file.lower().endswith((".png", ".jpg", ".jpeg")):
            continue

        logo_path = os.path.join(logo_folder, file)
        logo_img = cv2.imread(logo_path, cv2.IMREAD_COLOR)
        if logo_img is None:
            continue

        # Template matching
        res = cv2.matchTemplate(img, logo_img, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

        if max_val > best_score and max_val >= threshold:
            best_score = max_val
            best_brand = os.path.splitext(file)[0]  # filename as brand

    return {"brand": best_brand, "confidence": float(best_score)}
