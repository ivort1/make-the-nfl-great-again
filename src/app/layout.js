import Navigation from './_components/mobile/navigation/Navigation';
import './globals.css';
import { Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from './theme-provider';

const roboto_mono = Roboto_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ['latin'],
  display: "swap"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json"></link>
      <body className={`${roboto_mono.className}`}>
        <ThemeProvider>
          <div className="h-[100vh] text-sm">
            <div className="h-[90%] overflow-y-scroll py-7">
              {children}
            </div>
            <div className="h-[10%]">
              <Navigation />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}