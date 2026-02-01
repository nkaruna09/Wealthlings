import base64
from io import BytesIO
from PIL import Image
import cohere
import os
import re

co = cohere.ClientV2(os.environ["COHERE_API_KEY"])

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

        response = co.chat(
            model="command-a-vision-07-2025",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": LOGO_PROMPT},
                    {"type": "image_url", "image_url": {"url": data_url}}
                ],
            }],
            temperature=0
        )

        result = response.message.content[0].text.strip()
        if result != "NO_LOGO" and not VALID_OUTPUT.match(result):
            return "NO_LOGO"
        return {"logo": result if result != "NO_LOGO" else None}

    except Exception as e:
        print(f"[Logo Detection Error] {e}")
        return "NO_LOGO"
