'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IonIcon from '@reacticons/ionicons';

export default function Navigation({ data }) {
    const pathname = usePathname();

    return(
        <div className="
            bg-white
            bottom-6
            fixed
            h-16
            left-1/2
            rounded-2xl
            shadow-mobileNav
            text-black
            transform -translate-x-1/2
            w-[95%]
            z-[9999]
            flex
            flex-row">
            
            {
                data.map((link) => {
                    const isActive = pathname === link.href;

                    return(
                        <Link href={link.href} className="text-2xl flex items-center justify-center flex-1" key={link.text}>
                            <IonIcon
                                className={isActive ? "text-red-500" : "text-gray-400"}
                                name={isActive ? link.iconSolid : link.iconOutline}/>
                        </Link>
                    );
                })
            }
        </div>
    );
}