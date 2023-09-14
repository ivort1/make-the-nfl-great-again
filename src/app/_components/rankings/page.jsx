"use client"

import Image from 'next/image';

import { ThemeContext } from '../../theme-provider';
import { useContext } from 'react';

export default function Page({ data }) {
  const { users, seasonStatistics, seasonRankings } = useContext(ThemeContext);

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }

  const date = formatDate(data._createdAt);

  function organizeData(data, users, statistics, rankings) {
    let array = [];

    for(let x = 1; x <= 10; x++) {
      const user = users.filter(user => user.active).find(user => user.user_id === data[`Ranking_${x}`]);
      const stats = statistics.find(stats => stats.user_id === data[`Ranking_${x}`]);
      const ranking = rankings.find(ranking => ranking.user_id === data[`Ranking_${x}`])

      if(user) {
        array.push(
          {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            team_name: user.team_name ? user.team_name : `Team ${user.display_name}`,
            avatar: user.avatar,
            wins: stats.wins,
            losses: stats.losses,
            ties: stats.ties,
            ranking: x,
            previous_ranking: ranking[`week_${data.Week > 1 ? data.Week - 1 : 1}`],
            summary: data[`Summary_${x}`]
          }
        );
      }
    }

    return array;
  }

  const organizedData = organizeData(data, users, seasonStatistics, seasonRankings);

  return (
    <article className="mx-auto w-[90%] flex flex-col gap-12">
      <div>
        <h1 className="text-lg font-semibold">{data.title}</h1>
        <h3 className="text-xs text-gray-400">{date}</h3>
      </div>

      {
        organizedData.sort((a, b) => b.ranking - a.ranking).map(element => {
          let avatarUrl = element.avatar && element.avatar.startsWith("https://") ? element.avatar : `https://sleepercdn.com/avatars/${element.avatar}`;

          return (
            <div key={element.user_id} className="text-sm">
              <div className="flex flex-row items-center justify-start w-full gap-2">
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