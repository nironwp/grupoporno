import { Montserrat } from "next/font/google";

import "./globals.css";
import { ReactNode } from "react";
import { Variables } from "@/components/globals/Variables";
import { Toaster } from "@/components/ui/toaster";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        <Variables />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
