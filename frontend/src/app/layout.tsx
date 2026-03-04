import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SkinAI - AI-Powered Skin Disease Detection",
  description: "Advanced AI-powered skin disease detection system. Upload a photo and get instant analysis with our cutting-edge machine learning technology.",
  keywords: "skin disease, AI detection, dermatology, machine learning, health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: '72px' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
