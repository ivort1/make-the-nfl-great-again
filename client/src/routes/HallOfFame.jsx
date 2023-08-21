import { SupabaseContext } from '../SupabaseContext';
import { useContext } from 'react';
import Card from '../components/hallOfFame/Card';

export default function HallOfFame() {
    const { owners, teams, champions } = useContext(SupabaseContext);
    
    const championsWithDetails = champions.map(champion => {
        const firstPlaceOwner = owners.find(owner => owner.user_id === champion.first_place_user_id);
        const secondPlaceOwner = owners.find(owner => owner.user_id === champion.second_place_user_id);
        const thirdPlaceOwner = owners.find(owner => owner.user_id === champion.third_place_user_id);
      
        const firstPlaceTeam = teams.find(team => team.user_id === champion.first_place_user_id);
        const secondPlaceTeam = teams.find(team => team.user_id === champion.second_place_user_id);
        const thirdPlaceTeam = teams.find(team => team.user_id === champion.third_place_user_id);
      
        return {
          ...champion,
          first_place_owner: firstPlaceOwner,
          second_place_owner: secondPlaceOwner,
          third_place_owner: thirdPlaceOwner,
          first_place_team_details: firstPlaceTeam,
          second_place_team_details: secondPlaceTeam,
          third_place_team_details: thirdPlaceTeam
        };
    }).sort((a, b) => b.season - a.season);
      
    return(
        <>
            <div className="flex flex-col gap-5 px-2">
                <h1 className="font-semibold text-2xl">Hall of Fame</h1>

                <p className="text-sm">
                    Every league champion since the inception of the league is enshrined in the Hall of Fame.
                </p>

                <p className="text-sm">
                    *Except for the league champions, the 2015 and 2016 standings are unavailable.
                </p>
            </div>
     
            <div className="flex flex-col items-center gap-12 mt-10">
                {
                    championsWithDetails.map(element => {
                        let firstPlaceAvatarUrl = element.first_place_team_details?.avatar && element.first_place_team_details?.avatar.startsWith("https://") ? element.first_place_team_details?.avatar : `https://sleepercdn.com/avatars/${element.first_place_team_details?.avatar}`;
                        let secondPlaceAvatarUrl = element.second_place_team_details?.avatar && element.second_place_team_details?.avatar.startsWith("https://") ? element.second_place_team_details?.avatar : `https://sleepercdn.com/avatars/${element.second_place_team_details?.avatar}`;
                        let thirdPlaceAvatarUrl = element.third_place_team_details?.avatar && element.third_place_team_details?.avatar.startsWith("https://") ? element.third_place_team_details?.avatar : `https://sleepercdn.com/avatars/${element.third_place_team_details?.avatar}`;

                        return (
                            <Card key={element.season} data={element} firstPlaceAvatar={firstPlaceAvatarUrl} secondPlaceAvatar={secondPlaceAvatarUrl} thirdPlaceAvatar={thirdPlaceAvatarUrl} />
                        );
                    })
                }
            </div>
        </>
    );
}