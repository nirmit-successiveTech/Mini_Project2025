import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/visuals/Navbar";
import Footer from "@/components/visuals/Footer";
import UserProvider from "./context/User/userContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
