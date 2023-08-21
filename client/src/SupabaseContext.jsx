import { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropTypes from 'prop-types';

export const SupabaseContext = createContext();

export const SupabaseProvider =({ children }) => {
    SupabaseProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [league, setLeague] = useState([]);
    const [owners, setOwners] = useState([]);
    const [teams, setTeams] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        fetchDataFromSupabase();
    }, []);

    async function fetchDataFromSupabase() {
        try {
        const [leagueData, ownersData, teamsData, statisticsData, championsData] = await Promise.all([
            supabase.from("league").select(),
            supabase.from("owner").select(),
            supabase.from("team").select(),
            supabase.from("statistics").select(),
            supabase.from("champions").select()
        ]);

        setLeague(leagueData.data);
        setOwners(ownersData.data);
        setTeams(teamsData.data);
        setStatistics(statisticsData.data);
        setChampions(championsData.data);
        } catch(error) {
        console.log(error);
        }
    }

    return(
        <SupabaseContext.Provider value={{league, owners, teams, statistics, champions, fetchDataFromSupabase}}>
            {children}
        </SupabaseContext.Provider>
    )
}