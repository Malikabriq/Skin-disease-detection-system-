'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ImageUploader from '@/components/ImageUploader';
import PredictionResult from '@/components/PredictionResult';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import { predictDisease, Detection } from '@/lib/api';
import styles from './page.module.css';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading, token, logout } = useAuth();
    const { toasts, removeToast, success, error: showError } = useToast();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<{
        detections: Detection[];
        message?: string;
        annotated_image_url?: string;
    } | null>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setResults(null);
    };

    const handleAnalyze = async () => {
        if (!selectedFile || !token) return;

        setIsAnalyzing(true);
        try {
            const response = await predictDisease(selectedFile, token);
            setResults({
                detections: response.detections,
                message: response.message,
                annotated_image_url: response.annotated_image_url,
            });
            success('Analysis complete!');
        } catch (err) {
            showError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResults(null);
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className={styles.loadingPage}>
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    // Don't render if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.page}>
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <div className={`container ${styles.container}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h1>Dashboard</h1>
                        <p>Upload a skin image to analyze for potential diseases</p>
                    </div>
                    <button onClick={logout} className="btn btn-ghost">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16,17 21,12 16,7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className={styles.content}>
                    {/* Upload Section */}
                    <div className={styles.uploadSection}>
                        <div className={styles.sectionHeader}>
                            <h2>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Upload Image
                            </h2>
                            {selectedFile && (
                                <button onClick={handleReset} className={styles.resetBtn}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                                        <path d="M3 3v5h5" />
                                    </svg>
                                    Reset
                                </button>
                            )}
                        </div>

                        <ImageUploader
                            onFileSelect={handleFileSelect}
                            isLoading={isAnalyzing}
                            disabled={false}
                        />

                        {selectedFile && !results && (
                            <button
                                onClick={handleAnalyze}
                                className={`btn btn-primary ${styles.analyzeBtn}`}
                                disabled={isAnalyzing}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <span className="spinner"></span>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Analyze Image
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Results Section */}
                    {results && (
                        <div className={styles.resultsSection}>
                            <PredictionResult
                                detections={results.detections}
                                message={results.message}
                                annotatedImageUrl={results.annotated_image_url}
                            />

                            <button
                                onClick={handleReset}
                                className={`btn btn-secondary ${styles.newScanBtn}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                New Scan
                            </button>
                        </div>
                    )}
                </div>

                {/* Tips Section */}
                <div className={styles.tips}>
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Tips for Best Results
                    </h3>
                    <div className={styles.tipsList}>
                        <div className={styles.tipItem}>
                            <span className={styles.tipNumber}>1</span>
                            <p>Ensure good lighting when taking the photo</p>
                        </div>
                        <div className={styles.tipItem}>
                            <span className={styles.tipNumber}>2</span>
                            <p>Keep the camera steady and in focus</p>
                        </div>
                        <div className={styles.tipItem}>
                            <span className={styles.tipNumber}>3</span>
                            <p>Capture the affected area clearly</p>
                        </div>
                        <div className={styles.tipItem}>
                            <span className={styles.tipNumber}>4</span>
                            <p>Use high resolution images for better accuracy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
