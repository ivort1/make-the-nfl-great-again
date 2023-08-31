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

const navigationLinks = [
  {
    text: "Home",
    href: "/",
    iconOutline: "home-outline",
    iconSolid: "home",
    ariaLabel: "Home"
  },
  {
    text: "Blog",
    href: "/blog",
    iconOutline: "newspaper-outline",
    iconSolid: "newspaper",
    ariaLabel: "Blog"
  },
  {
    text: "Statistics",
    href: "/statistics",
    iconOutline: "stats-chart-outline",
    iconSolid: "stats-chart",
    ariaLabel: "Statistics"
  },
  {
    text: "Hall of Fame",
    href: "/hall-of-fame",
    iconOutline: "trophy-outline",
    iconSolid: "trophy",
    ariaLabel: "Hall of Fame"
  }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json"></link>
      <body className={`${roboto_mono.className} mt-6 mb-32 text-sm`}>
        <ThemeProvider>
          {children}
          <Navigation data={navigationLinks}/>

        </ThemeProvider>
      </body>
    </html>
  )
}