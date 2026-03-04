const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface Detection {
  disease: string;
  confidence: number;
}

export interface PredictionResponse {
  user_id: number;
  message?: string;
  detections: Detection[];
  annotated_image_url?: string;
}

export interface ApiError {
  detail: string;
}

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

// Auth API
export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  return apiRequest<User>('/user/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export async function loginUser(
  username: string,
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

// Prediction API
export async function predictDisease(
  file: File,
  token: string
): Promise<PredictionResponse> {
  const url = `${API_URL}/prediction/predict`;

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ detail: 'Prediction failed' }));
    throw new Error(error.detail || 'Prediction failed');
  }

  return response.json();
}

// Token management
export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export function setStoredToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export function removeStoredToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}
