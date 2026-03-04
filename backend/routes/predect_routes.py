from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
from jose import jwt, JWTError, ExpiredSignatureError
from PIL import Image
from dotenv import load_dotenv
import io
import os
import uuid
import numpy as np

load_dotenv()

# YOLO
from ultralytics import YOLO

# CONFIG

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGOEITHM")

security = HTTPBearer()

# FASTAPI APP

app = FastAPI(title="Skin Disease detection API")

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)


# LOAD YOLO MODEL

model = YOLO("model/best (1).pt")  #  your YOLO model path


# AUTH: GET CURRENT USER

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")

        return user_id

    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")



# PREDICTION FUNCTION

def yolo_predict(image: Image.Image, confidence_threshold=0.1):
    results = model.predict(image, conf=confidence_threshold)

    detections = []
    annotated_filename = None

    if not results or len(results[0].boxes) == 0:
        return detections, None

    # Save annotated image
    # results[0].plot() returns BGR numpy array
    annotated_image_array = results[0].plot()
    # Convert BGR (OpenCV) to RGB (PIL)
    annotated_image_rgb = Image.fromarray(annotated_image_array[:, :, ::-1])
    
    annotated_filename = f"pred_{uuid.uuid4()}.jpg"

    static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
    if not os.path.exists(static_dir):
        os.makedirs(static_dir)
        
    annotated_image_rgb.save(os.path.join(static_dir, annotated_filename))

    boxes = results[0].boxes
    names = model.names  # class index -> class name

    for box in boxes:
        class_id = int(box.cls[0])
        confidence = float(box.conf[0])

        detections.append({
            "disease": names[class_id],
            "confidence": round(confidence, 4)
        })

    return detections, annotated_filename


# PREDICTION ENDPOINT

@router.post("/predict")
async def predict_disease(
    file: UploadFile = File(...),
    user_id: int = Depends(get_current_user)
):
    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG files are allowed"
        )

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    detections, annotated_filename = yolo_predict(image)

    if not detections:
        return JSONResponse({
            "user_id": user_id,
            "message": "No skin disease detected",
            "detections": []
        })

    return JSONResponse({
        "user_id": user_id,
        "detections": detections,
        "annotated_image_url": f"/static/{annotated_filename}" if annotated_filename else None
    })



