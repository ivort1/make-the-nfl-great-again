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
        <div className="h-[10%] fixed bottom-0 w-full bg-red-500 z-[9999] flex flex-row justify-around">
            {
                navigationLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return(
                        <Link href={link.href} className="relative h-fit flex flex-col items-center justify-start" key={link.text}>
                            {isActive && <div className='absolute top-0 h-[2px] bg-white w-10'></div>}
                            <IonIcon className="h-fit mt-3 text-2xl text-white" name={isActive ? link.iconSolid : link.iconOutline}/>
                        </Link>
                    );
                })
            }
        </div>
    );
}