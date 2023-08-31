"use client"

import { ThemeContext } from '../theme-provider';
import { useContext } from 'react';
import Card from './_components/Card';
import Image from 'next/image';

export default function Page() {
    const { users, champions } = useContext(ThemeContext);

    const championshipTeams = champions.map(champion => {
        const firstPlaceOwner = users.find(user => user.user_id === champion.first_place_user_id);
        const secondPlaceOwner = users.find(user => user.user_id === champion.second_place_user_id);
        const thirdPlaceOwner = users.find(user => user.user_id === champion.third_place_user_id);
      
        const firstPlaceTeam = users.find(user => user.user_id === champion.first_place_user_id);
        const secondPlaceTeam = users.find(user => user.user_id === champion.second_place_user_id);
        const thirdPlaceTeam = users.find(user => user.user_id === champion.third_place_user_id);
      
        return {
            season: champion.season,
            first_place: {
                first_name: firstPlaceOwner.first_name,
                last_name: firstPlaceOwner.last_name,
                team: firstPlaceTeam.team_name ? firstPlaceTeam.team_name : `Team ${firstPlaceTeam.display_name}`,
                avatar: firstPlaceTeam.avatar
            },
            second_place: {
                first_name: secondPlaceOwner.first_name,
                last_name: secondPlaceOwner.last_name,
                team: secondPlaceTeam.team_name ? secondPlaceTeam.team_name : `Team ${secondPlaceTeam.display_name}`,
                avatar: secondPlaceTeam.avatar
            },
            third_place: {
                first_name: thirdPlaceOwner.first_name,
                last_name: thirdPlaceOwner.last_name,
                team: thirdPlaceTeam.team_name ? thirdPlaceTeam.team_name : `Team ${thirdPlaceTeam.display_name}`,
                avatar: thirdPlaceTeam.avatar
            }
        };
    }).sort((a, b) => b.season - a.season);
      
    return(
        <>
            <div className="w-full flex flex-col items-center justify-center gap-7">
                <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                    <h1 className="font-semibold text-lg">Hall of Fame</h1>
                    <Image src="/gif/trophy.gif" alt="trophy" width={50} height={50}/>
                </div>

                <p className="w-[90%]">
                    Every league champion since the inception of the league is enshrined in the Hall of Fame.
                </p>

                <p className="w-[90%]">
                    Except for the league champions, the 2015 and 2016 standings are unavailable.
                </p>
          
                {
                    championshipTeams.map(element => {
                        let firstPlaceAvatarUrl = element.first_place?.avatar && element.first_place?.avatar.startsWith("https://") ? element.first_place?.avatar : `https://sleepercdn.com/avatars/${element.first_place?.avatar}`;
                        let secondPlaceAvatarUrl = element.second_place?.avatar && element.second_place?.avatar.startsWith("https://") ? element.second_place?.avatar : `https://sleepercdn.com/avatars/${element.second_place?.avatar}`;
                        let thirdPlaceAvatarUrl = element.third_place?.avatar && element.third_place?.avatar.startsWith("https://") ? element.third_place?.avatar : `https://sleepercdn.com/avatars/${element.third_place?.avatar}`;

                        return (
                            <Card
                                key={element.season}
                                data={element}
                                firstPlaceAvatar={firstPlaceAvatarUrl}
                                secondPlaceAvatar={secondPlaceAvatarUrl}
                                thirdPlaceAvatar={thirdPlaceAvatarUrl} />
                        );
                    })
                }
            </div>
        </>
    );
}