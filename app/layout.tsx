import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal TicsCode",
  description: "Acceso a clientes TiscCode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={inter.className}>{children}</div>
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/49713625.js"></script>
      </body>
    </html>
  );
}
