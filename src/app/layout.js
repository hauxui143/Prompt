import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Prompt Enhancer - Transform Your Prompts with AI",
  description: "Enhance your AI prompts with advanced prompt engineering techniques. Make your prompts more effective, detailed, and specific for better AI interactions.",
  keywords: "AI, prompt engineering, OpenAI, prompt enhancement, artificial intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 to-blue-50`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '16px',
            },
          }}
        />
      </body>
    </html>
  );
}