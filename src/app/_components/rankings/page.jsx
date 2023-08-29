"use client"

import Image from 'next/image';

import { ThemeContext } from '../../theme-provider';
import { useContext } from 'react';

export default function Page({ data }) {
  const { owners, teams, seasonStatistics, seasonRankings } = useContext(ThemeContext);

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }

  const date = formatDate(data._createdAt);

  function organizeData(data, owners, teams, statistics, rankings) {
    let array = [];

    for(let x = 1; x <= 10; x++) {
      const owner = owners.filter(owner => owner.active).find(owner => owner.user_id === data[`Ranking_${x}`]);
      const team = teams.find(team => team.user_id === data[`Ranking_${x}`]);
      const stats = statistics.find(stats => stats.user_id === data[`Ranking_${x}`]);
      const ranking = rankings.find(ranking => ranking.user_id === data[`Ranking_${x}`])

      if(owner) {
        array.push(
          {
            user_id: owner.user_id,
            first_name: owner.first_name,
            last_name: owner.last_name,
            team_name: team.team_name,
            avatar: team.avatar,
            wins: stats.wins,
            losses: stats.losses,
            ties: stats.ties,
            ranking: x,
            previous_ranking: ranking[`week_${data.Week > 0 ? data.Week - 1 : 0}`],
            summary: data[`Summary_${x}`]
          }
        );
      }
    }

    return array;
  }

  const organizedData = organizeData(data, owners, teams, seasonStatistics, seasonRankings);

  return (
    <article className="mx-auto w-[90%] flex flex-col gap-12">
      <div>
        <h1 className="text-lg">{data.title}</h1>
        <h3 className="text-gray-400">{date}</h3>
      </div>

      {
        organizedData.sort((a, b) => b.ranking - a.ranking).map(element => {
          let avatarUrl = element.avatar && element.avatar.startsWith("https://") ? element.avatar : `https://sleepercdn.com/avatars/${element.avatar}`;

          return (
            <div key={element.user_id} className="text-sm">
              <div className="w-full flex flex-row items-center justify-start gap-2">
                {`${element.ranking}. `}
                <Image src={avatarUrl} className="m-0 rounded-full" width={50} height={50} alt="avatar" />

                <div className="flex flex-col">
                  <span className="font-semibold">{element.team_name}</span>
                  <span className="text-xs text-gray-400">{`${element.wins}-${element.losses}`}</span>
                  <span className="text-xs text-gray-400">Previous ranking: {element.previous_ranking}</span>
                </div>
              </div>
              <p className="mt-2">{element.summary}</p>
            </div>
          );
        })
      }

      <Image src={"/gif/lightning.gif"} alt="lightning bolt" width={75} height={75} className="mx-auto"/>
    </article>   
  );
}