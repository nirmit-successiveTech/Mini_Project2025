import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/visuals/Navbar";
import Footer from "@/components/visuals/Footer";
import UserProvider from "./context/User/userContext";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";
import Providers from "./provider";



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
          <Providers>
            <Navbar />
            {children}
          </Providers>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
