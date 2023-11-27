import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Poppins } from 'next/font/google';
import ThemeProvider from './providers/ThemeProvider';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'coinscope',
  description: 'webapp to track crypto coins',
};

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = null;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-[#eaebf5] dark:bg-[#0d0e30]`}>
        <ThemeProvider attribute="class">
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// dark:bg-gradient-to-r dark:from-[#302568] dark:to-[#0d0e30]
