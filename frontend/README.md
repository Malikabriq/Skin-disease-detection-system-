# Skin Disease Detection System

A full-stack machine learning project for detecting skin diseases from uploaded images. The application combines a Python-based backend for image processing and model inference with a modern Next.js frontend for user interaction and result display.

## Project Description

This project is designed to help users identify possible skin diseases by uploading images and receiving predictions through an AI-powered backend. The frontend provides a clean and responsive interface, while the backend handles the prediction pipeline, model loading, and API communication.

## Key Features

- Image upload from the frontend
- Skin disease prediction using backend inference
- Responsive web interface
- Separate frontend and backend architecture
- Easy local setup for development
- Environment-based configuration for API and app settings
- Suitable for academic or research project presentation

## Technology Stack

### Backend
- Python
- Flask (or equivalent Python web framework used by the backend)
- Machine learning / deep learning inference pipeline
- Image preprocessing utilities
- Environment variables for configuration

### Frontend
- Next.js
- React
- TypeScript
- CSS / component-based styling

### Tools
- npm for frontend dependency management
- pip for backend dependency management
- Git for version control

## Project Architecture

```text
Skin-Disease-Detection-FYP-/
├── backend/                   # Python backend service
│   ├── app.py                 # Backend entry point
│   ├── requirements.txt       # Python dependencies
│   ├── model/                 # Trained model / model assets
│   ├── uploads/               # Temporary uploaded images
│   ├── .env.example           # Example backend environment file
│   └── ...                    # Additional backend utilities
├── frontend/                  # Next.js frontend application
│   ├── app/                   # App pages and app router
│   ├── components/            # Reusable UI components
│   ├── public/                # Static assets
│   ├── package.json           # Frontend dependencies and scripts
│   ├── .env.example           # Example frontend environment file
│   └── ...                    # Additional frontend files
├── .gitignore
├── README.md
└── ...