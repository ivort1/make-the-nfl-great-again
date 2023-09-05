"use client"

import { useContext } from 'react';
import { ThemeContext } from '../../theme-provider';
import Image from 'next/image';

export default function Champion() {
    const { league, users } = useContext(ThemeContext);
    const champion = users.find(user => user.user_id === league[0].current_champion);

    return(
        <div className="w-[90%]">
            <p>Reigning league champion:</p>

            {
                champion ?
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <Image src="/svg/trophy.svg" width={40} height={40} alt="trophy" className="absolute z-50 bottom-0 left-14 drop-shadow-md" />
                        <Image src={champion.avatar} className="border-solid border-4 border-[#FFE02F] h-auto rounded-full mt-3" width={80} height={80} alt="avatar" />
                    </div>
                    <h1 className="mt-2 font-semibold">{champion.team_name}</h1>
                    <h3 className="text-gray-400">{`${champion.first_name} ${champion.last_name}`}</h3>
                </div>
                :
                <div className="animate-pulse w-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <div className="w-[80px] h-[80px] rounded-full mt-3 bg-gray-300" />
                    </div>
                    <div className="w-[120px] h-12 bg-gray-300 rounded-md"></div>
                </div>
            }
        </div>
    );
  }