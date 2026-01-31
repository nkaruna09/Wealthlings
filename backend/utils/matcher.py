# utils/matcher.py

from rapidfuzz import process

def match_brand(texts, brands):
    best_match = None
    best_score = 0

    for text in texts:
        match, score, _ = process.extractOne(text, brands)
        if score > best_score:
            best_match = match
            best_score = score

    if best_score > 70:
        return {
            "brand": best_match,
            "confidence": best_score / 100
        }

    return {
        "brand": None,
        "confidence": 0
    }
