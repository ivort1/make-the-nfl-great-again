"use client"

import { useContext, useState } from 'react';
import { ThemeContext } from '../theme-provider';
import Image from 'next/image';
import Card from '../_components/card/Card';
import Tab from "../_components/tab/Tab";

export default function Page() {
    const { users, statistics } = useContext(ThemeContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = ["Wins/Losses", "Points", "Playoffs"];
    const [sortByOptions, setSortByOptions] = useState(["Wins", "Losses", "Ties", "Win %", "Avg wins"]);
    const [sortBy, setSortBy] = useState(sortByOptions[0]);
    const sortedUsers = sortStatistics();

    function setIndexAndSelect(index) {
        const activeIndex = index;
        let options = [];
        if(activeIndex === 0) options = ["Wins", "Losses", "Ties", "Win %", "Avg wins"];
        if(activeIndex === 1) options = ["Points for", "Points against", "Avg points for", "Avg points against"];
        if(activeIndex === 2) options = ["Appearances", "Playoff wins", "Playoff losses", "Championships", "Last place"];
        setActiveIndex(activeIndex);
        setSortByOptions(options);
        setSortBy(options[0]);
    }

    function handleChange(event) {
        setSortBy(event.target.value);
    }

    function sortStatistics() {
        return [...users.filter(user => user.active)].sort((a, b) => {
            const aStatistics = statistics.find(stat => stat.user_id === a.user_id);
            const bStatistics = statistics.find(stat => stat.user_id === b.user_id);
    
            let aStat, bStat;
    
            switch(sortBy) {
                case "Wins":
                    aStat = aStatistics?.total_wins;
                    bStat = bStatistics?.total_wins;
                    break;
                case "Losses":
                    aStat = aStatistics?.total_losses;
                    bStat = bStatistics?.total_losses;
                    break;
                case "Ties":
                    aStat = aStatistics?.total_ties;
                    bStat = bStatistics?.total_ties;
                    break;
                case "Win %":b
                    aStat = aStatistics?.win_percentage;
                    bStat = bStatistics?.win_percentage;
                    break;
                case "Avg wins":
                    aStat = aStatistics?.average_wins;
                    bStat = bStatistics?.average_wins;
                    break;
                case "Points for":
                    aStat = aStatistics?.total_points_for;
                    bStat = bStatistics?.total_points_for;
                    break;
                case "Points against":
                    aStat = aStatistics?.total_points_against;
                    bStat = bStatistics?.total_points_against;
                    break;
                case "Avg points for":
                    aStat = aStatistics?.average_points_for;
                    bStat = bStatistics?.average_points_for;
                    break;
                case "Avg points against":
                    aStat = aStatistics?.average_points_against;
                    bStat = bStatistics?.average_points_against;
                    break;
                case "Appearances":
                    aStat = aStatistics?.playoff_appearances;
                    bStat = bStatistics?.playoff_appearances;
                    break;
                case "Playoff wins":
                    aStat = aStatistics?.playoff_wins;
                    bStat = bStatistics?.playoff_wins;
                    break;
                case "Playoff losses":
                    aStat = aStatistics?.playoff_losses;
                    bStat = bStatistics?.playoff_losses;
                    break;
                case "Championships":
                    aStat = aStatistics?.championships;
                    bStat = bStatistics?.championships;
                    break;
                case "Last place":
                    aStat = aStatistics?.last_place;
                    bStat = bStatistics?.last_place;
                    break;
            }
            return bStat - aStat;
        })
    }

    return(
        <div className="w-full flex flex-col items-center justify-center gap-7">
            
            <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                    <h1 className="font-semibold text-lg">Statistics</h1>
                    <Image src="/gif/line-chart.gif" alt="trophy" width={50} height={50}/>
            </div>

            <p className="w-[90%]">
                All-time statistics beginning with the 2017 season and the numbers are updated on a weekly basis. Regular season only.
            </p>

            <p className="w-[90%]">
                The 2015 and 2016 statistics are unavailable and not included in these calculations.
            </p>
           
            <div className="flex flex-row gap-5 w-[90%]">
                {
                    tabs.map((element, index) => (
                        <Tab css={index === activeIndex ? "bg-red-100 text-red-500 border-solid border-2 border-red-100" : "text-gray-400 border-solid border-2 border-gray-200"} key={element} text={element} onClick={() => setIndexAndSelect(index)}/>
                    ))
                }
            </div>

            <div className="w-[90%] flex flex-row items-center gap-3">
                <label className="font-semibold text-gray-400" htmlFor="sortBy">Sort by:</label>
                <select className="bg-slate-100 text-gray-400 border-solid border-2 border-gray-200 font-semibold px-4 py-2 rounded-2xl h-9 w-48" id="sortBy" value={sortBy} onChange={handleChange}>
                    {
                        sortByOptions.map(element => (
                            <option key={element} value={element}>{element}</option>
                        ))
                    }
                </select>
            </div>

            {
                sortedUsers.map(user => {
                    const userStatistics = statistics.find(stat => stat.user_id === user.user_id);

                    const wins = [];
                    wins.push({title: "Wins", stat: userStatistics?.total_wins});
                    wins.push({title: "Losses", stat: userStatistics?.total_losses});
                    wins.push({title: "Ties", stat: userStatistics?.total_ties});
                    wins.push({title: "Win %", stat: userStatistics?.win_percentage});
                    wins.push({title: "Avg wins", stat: userStatistics?.average_wins});

                    const points = [];
                    points.push({title: "Points for", stat: userStatistics?.total_points_for});
                    points.push({title: "Points against", stat: userStatistics?.total_points_against});
                    points.push({title: "Avg points for", stat: userStatistics?.average_points_for});
                    points.push({title: "Avg points against", stat: userStatistics?.average_points_against});

                    const playoffs = [];
                    playoffs.push({title: "Appearances", stat: userStatistics?.playoff_appearances});
                    playoffs.push({title: "Wins", stat: userStatistics?.playoff_wins});
                    playoffs.push({title: "Losses", stat: userStatistics?.playoff_losses});
                    playoffs.push({title: "Championships", stat: userStatistics?.championships});
                    playoffs.push({title: "Last place", stat: userStatistics?.last_place});

                    let data = [];
                    switch(activeIndex) {
                        case 0: {
                            data = wins;
                            break;
                        }
                        case 1: {
                            data = points;        
                            break;
                        }
                        case 2: {
                            data = playoffs;
                            break;
                        }
                    }

                    return(
                        <Card key={user.user_id} user={user} statistics={userStatistics} data={data}/>
                    );
                })
            }
        </div>
    );
}