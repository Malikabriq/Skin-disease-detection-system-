'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>
                        Skin<span className="gradient-text">AI</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className={styles.navLink}>
                                Dashboard
                            </Link>
                            <button onClick={logout} className={`btn btn-ghost ${styles.logoutBtn}`}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.navLink}>
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <Link href="/" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    Home
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                            Dashboard
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                setMobileMenuOpen(false);
                            }}
                            className={styles.mobileLink}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                            Login
                        </Link>
                        <Link href="/register" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
