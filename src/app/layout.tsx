import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Учет техники",
    description: "CRM система для учета техники",
};

export default  function RootLayout({
    children,
                                    } : Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
        >
        <body className={inter.className}>
        <Toaster position="bottom-right" />
        </body>
        </html>
    )
}