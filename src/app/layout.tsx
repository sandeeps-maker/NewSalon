import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { SalonProvider } from '../context/SalonContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'SalonFlow - Modern Salon Daily Management Dashboard',
  description: 'Simple SaaS daily salon management web app for men’s barber shops & women’s beauty parlours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={`${roboto.className} bg-[#e6e8ec] text-slate-900 min-h-screen antialiased`}>
        <SalonProvider>
          {children}
        </SalonProvider>
      </body>
    </html>
  );
}
