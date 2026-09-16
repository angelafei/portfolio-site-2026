import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: "Angela Fei's portfolio site",
  description: 'Front-end Developer & Digital Experience Specialist',
};

export default function RootLayout({ children }) {
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        {analyticsId && /^G-[A-Z0-9]+$/.test(analyticsId) && <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${analyticsId}');`}</Script>
        </>}
      </body>
    </html>
  );
}
