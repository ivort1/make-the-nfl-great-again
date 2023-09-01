"use client"

import { ThemeContext } from '../theme-provider';
import { useContext } from 'react';
import Card from './_components/Card';
import Image from 'next/image';

export default function Page() {
    const { users, champions } = useContext(ThemeContext);

    const championshipTeams = champions.map(champion => {
        const firstPlaceUser = users.find(user => user.user_id === champion.first_place_user_id);
        const secondPlaceUser = users.find(user => user.user_id === champion.second_place_user_id);
        const thirdPlaceUser = users.find(user => user.user_id === champion.third_place_user_id);
      
        return {
            season: champion.season,
            first_place: {
                first_name: firstPlaceUser.first_name,
                last_name: firstPlaceUser.last_name,
                team: firstPlaceUser.team_name,
                avatar: firstPlaceUser.avatar
            },
            second_place: {
                first_name: secondPlaceUser.first_name,
                last_name: secondPlaceUser.last_name,
                team: secondPlaceUser.team_name,
                avatar: secondPlaceUser.avatar
            },
            third_place: {
                first_name: thirdPlaceUser.first_name,
                last_name: thirdPlaceUser.last_name,
                team: thirdPlaceUser.team_name,
                avatar: thirdPlaceUser.avatar
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
                        let firstPlaceAvatarUrl = element.first_place.avatar;
                        let secondPlaceAvatarUrl = element.second_place.avatar;
                        let thirdPlaceAvatarUrl = element.third_place.avatar;

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