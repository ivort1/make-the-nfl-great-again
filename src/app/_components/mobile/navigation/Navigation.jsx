'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IonIcon from '@reacticons/ionicons';

export default function Navigation({ data }) {
    const pathname = usePathname();

    return(
        <div className="
            bg-white
            border-t-2
            border-solid
            border-gray-200
            bottom-0
            fixed
            h-[10%]
            text-black
            w-full
            z-[9999]
            flex
            flex-row
            justify-around">
            
            {
                data.map((link) => {
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
        </div>
    );
}