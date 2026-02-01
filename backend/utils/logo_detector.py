import base64
from io import BytesIO
from PIL import Image
from google import genai
from google.genai import types
import os
import re

go = genai.Client()

LOGO_PROMPT = """
You are a strict logo-detection system.

Only detect logos that are explicitly visible graphical marks
(symbols, wordmarks, or emblems).

Do NOT identify brands from:
- product shape or design
- device model or silhouette
- colors, materials, or style
- scene context or common associations

Rules:
- If a logo is not clearly and directly visible in the image, return exactly:
NO_LOGO
- Do not guess or infer.
- Return only a single line of text.
"""

VALID_OUTPUT = re.compile(r"^[A-Za-z0-9 .&-]{2,40}$")

def detect_logo(image_path: str) -> str:
    try:
        image = Image.open(image_path).convert("RGB")
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
        data_url = f"data:image/png;base64,{b64}"


        image_bytes = buffer.getvalue()

        response = go.models.generate_content(
            model='gemini-3-flash-preview',
            contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/png',
            ),
            LOGO_PROMPT
            ]
        )

        result = response.text.strip()
        if result != "NO_LOGO" and not VALID_OUTPUT.match(result):
            return "NO_LOGO"
        return {"logo": result if result != "NO_LOGO" else None}

    except Exception as e:
        print(f"[Logo Detection Error] {e}")
        return "NO_LOGO"
