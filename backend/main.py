from fastapi import FastAPI
from routes.user_routes import router as user_route
from user.model import User
from user.database import engin,Base
from fastapi.staticfiles import StaticFiles
from routes.predect_routes import  router as predect_route

from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="Skin disease detection ")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Skin Disease Prediction API is running"}

@app.on_event('startup')
def create_table():
    Base.metadata.create_all(bind=engin)

app.include_router(user_route)
app.include_router(predect_route)

# Mount static files for serving images
import os
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

app.mount("/static", StaticFiles(directory=static_dir), name="static")





