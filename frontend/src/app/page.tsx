import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              AI-Powered Detection
            </div>
            <h1 className={styles.heroTitle}>
              Detect Skin Diseases with{' '}
              <span className="gradient-text">Advanced AI</span>
            </h1>
            <p className={styles.heroDescription}>
              Upload a photo of your skin condition and get instant, accurate analysis
              powered by cutting-edge machine learning technology. Fast, private, and reliable.
            </p>
            <div className={styles.heroCta}>
              <Link href="/register" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Get Started Free
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.scanAnimation}>
                  <div className={styles.scanLine}></div>
                  <svg className={styles.scanIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className={styles.resultPreview}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Analysis Complete</span>
                    <span className={styles.resultValue}>98.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background Glow */}
        <div className={styles.heroGlow}></div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Scans Completed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>95%</span>
              <span className={styles.statLabel}>Accuracy Rate</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Disease Types</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Why Choose <span className="gradient-text">SkinAI</span>?
            </h2>
            <p className={styles.sectionDescription}>
              Our advanced AI technology provides fast, accurate, and reliable skin disease detection
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Get results in seconds with our optimized AI models and cloud infrastructure</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>Highly Accurate</h3>
              <p>Trained on thousands of dermatological images for precise disease identification</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3>Secure & Private</h3>
              <p>Your images are encrypted and never stored. Complete privacy guaranteed</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>24/7 Available</h3>
              <p>Access our AI detection service anytime, anywhere, on any device</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust SkinAI for their skin health analysis</p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className="btn btn-primary">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>
                Skin<span className="gradient-text">AI</span>
              </span>
              <p>AI-Powered Skin Disease Detection</p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 SkinAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
