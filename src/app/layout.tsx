import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import 'react-loading-skeleton/dist/skeleton.css';
import "simplebar-react/dist/simplebar.min.css";
import "./globals.css";
import Footer from "@/components/footer";
import ConditionalFooter from '@/components/conditionalFooter';

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D43KJEWFEB"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D43KJEWFEB');
          `
        }} />
      </head>
      <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
        <Providers>
          <Navbar/>
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
