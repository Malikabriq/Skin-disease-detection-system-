'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
    onFileSelect: (file: File) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function ImageUploader({ onFileSelect, isLoading, disabled }: ImageUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (disabled || isLoading) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a JPG, JPEG, or PNG image');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setFileName(file.name);
        onFileSelect(file);
    };

    const handleClick = () => {
        if (!disabled && !isLoading) {
            inputRef.current?.click();
        }
    };

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        setFileName(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div
            className={`${styles.uploader} ${dragActive ? styles.active : ''} ${disabled || isLoading ? styles.disabled : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className={styles.input}
                disabled={disabled || isLoading}
            />

            {preview ? (
                <div className={styles.previewContainer}>
                    <img src={preview} alt="Preview" className={styles.preview} />
                    <div className={styles.previewOverlay}>
                        <span className={styles.fileName}>{fileName}</span>
                        <button onClick={clearImage} className={styles.clearBtn} disabled={isLoading}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    {isLoading && (
                        <div className={styles.loadingOverlay}>
                            <div className="spinner"></div>
                            <span>Analyzing...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.placeholder}>
                    <div className={styles.icon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className={styles.title}>Upload Skin Image</h3>
                    <p className={styles.subtitle}>
                        Drag and drop or <span className={styles.link}>browse</span>
                    </p>
                    <p className={styles.hint}>Supports JPG, JPEG, PNG</p>
                </div>
            )}
        </div>
    );
}
