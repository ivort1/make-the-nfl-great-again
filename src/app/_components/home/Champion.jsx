"use client"

import { useContext } from 'react';
import { ThemeContext } from '../../theme-provider';
import Image from 'next/image';

export default function Champion() {
    const { currentChampion } = useContext(ThemeContext);
    
    let champion = {};
    let avatarSrc = "";

    if (currentChampion[0] && Object.keys(currentChampion[0]).length > 0) {
        champion = currentChampion[0];
        avatarSrc = champion.avatar.startsWith("https://") ? champion.avatar : `https://sleepercdn.com/avatars/${champion.avatar}`;
    }

    return(
        <div className="w-[90%]">
            <p>Reigning league champion:</p>

            <div className="w-full flex flex-col items-center justify-center">
                <div className="relative">
                    <Image src="/svg/trophy.svg" width={40} height={40} alt="trophy" className="absolute z-50 bottom-0 left-14 drop-shadow-md" />
                    {avatarSrc && <Image src={avatarSrc} className="border-solid border-4 border-[#FFE02F] h-auto rounded-full mt-3" width={80} height={80} alt="avatar" />}
                </div>
                <h1 className="mt-2 font-semibold">{champion.team_name}</h1>
                <h3 className="text-gray-400">{`${champion.first_name} ${champion.last_name}`}</h3>
            </div>
        </div>
    );
  }