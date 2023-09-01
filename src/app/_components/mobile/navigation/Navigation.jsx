'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IonIcon from '@reacticons/ionicons';

export default function Navigation() {
    const pathname = usePathname();

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

    return(
        <>
            {
                navigationLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return(
                        <Link href={link.href} className="h-fit mt-3 text-2xl flex flex-row items-center justify-center" key={link.text}>
                            <IonIcon
                                className={isActive ? "text-red-500" : "text-gray-400"}
                                name={isActive ? link.iconSolid : link.iconOutline}/>
                        </Link>
                    );
                })
            }
        </>
    );
}