"use client"

import { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const ThemeContext = createContext();

export const ThemeProvider =({ children }) => {
    ThemeProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [league, setLeague] = useState([]);
    const [owners, setOwners] = useState([]);
    const [teams, setTeams] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [champions, setChampions] = useState([]);
    const [seasonStatistics, setSeasonStatistics] = useState([]);
    const [seasonRankings, setSeasonRankings] = useState([]);
    const [currentChampion, setCurrentChampion] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchDataFromSupabase();
    }, []);

    async function fetchDataFromSupabase() {
        try {
            const [leagueData, ownersData, teamsData, statisticsData, championsData, seasonStatisticsData, seasonRankingsData, currentChampionData, userData] = await Promise.all([
                supabase.from("league").select(),
                supabase.from("owner").select(),
                supabase.from("team").select(),
                supabase.from("statistics").select(),
                supabase.from("champions").select(),
                supabase.from("season_2023_statistics").select(),
                supabase.from("season_2023_rankings").select(),
                supabase.from('league_champion_info').select('*').eq('league_uid', process.env.NEXT_PUBLIC_LEAGUE_UID),
                supabase.from("user").select(),
            ]);

            setLeague(leagueData.data);
            setOwners(ownersData.data);
            setTeams(teamsData.data);
            setStatistics(statisticsData.data);
            setChampions(championsData.data);
            setSeasonStatistics(seasonStatisticsData.data);
            setSeasonRankings(seasonRankingsData.data);
            setCurrentChampion(currentChampionData.data);
            setUsers(userData.data);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <ThemeContext.Provider value={{league, owners, teams, statistics, champions, seasonStatistics, seasonRankings, currentChampion, users, fetchDataFromSupabase}}>
            {children}
        </ThemeContext.Provider>
    )
}