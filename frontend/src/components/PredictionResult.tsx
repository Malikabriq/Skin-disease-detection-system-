'use client';

import React from 'react';
import { Detection } from '@/lib/api';
import styles from './PredictionResult.module.css';

interface PredictionResultProps {
    detections: Detection[];
    message?: string;
    annotatedImageUrl?: string;
}

export default function PredictionResult({ detections, message, annotatedImageUrl }: PredictionResultProps) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    if (message && detections.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.noDetection}>
                    <div className={styles.successIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                    </div>
                    <h3>Good News!</h3>
                    <p>{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
                Detection Results
            </h3>

            {annotatedImageUrl && (
                <div className={styles.imageContainer}>
                    <img
                        src={`${API_URL}${annotatedImageUrl}`}
                        alt="Detection Analysis"
                        className={styles.annotatedImage}
                    />
                    <div className={styles.imageBadge}>AI Analysis</div>
                </div>
            )}

            <div className={styles.resultsList}>
                {detections.map((detection, index) => (
                    <div key={index} className={styles.resultCard}>
                        <div className={styles.resultHeader}>
                            <span className={styles.diseaseName}>{detection.disease}</span>
                            <span className={styles.confidenceBadge}>
                                {(detection.confidence * 100).toFixed(1)}%
                            </span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${detection.confidence * 100}%` }}
                            ></div>
                        </div>
                        <p className={styles.confidenceLabel}>Confidence Score</p>
                    </div>
                ))}
            </div>
            <div className={styles.disclaimer}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>This is an AI-powered prediction. Please consult a dermatologist for professional diagnosis.</span>
            </div>
        </div>
    );
}
