import easyocr

reader = easyocr.Reader(['en'], gpu=False)

def extract_text(image_path):
    results = reader.readtext(image_path)
    texts = []

    for (_, text, confidence) in results:
        if confidence > 0.4:
            texts.append(text)

    return texts
