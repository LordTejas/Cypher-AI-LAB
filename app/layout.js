import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"] 
});

export const metadata = {
  title: "Cypher AI Lab",
  description: "Unleashing Linguistic Ingenuity with Text Retrieval, Content Generation, Chat Mastery, and Grammar Brilliance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
