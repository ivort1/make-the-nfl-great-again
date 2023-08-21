import Stat from "./Stat";

function Card({ owner, team, statistics, data}) {
    const avatarUrl = team.avatar && team.avatar.startsWith("https://") ? team.avatar : `https://sleepercdn.com/avatars/${team.avatar}`;

    return(
        <div className="bg-white text-black p-8 rounded-md shadow-statsCard w-[90%] flex flex-col items-center justify-center gap-6">
            <div className="flex flex-row gap-3 items-center">
                <img className="w-1/6 h-auto rounded-full" src={avatarUrl} />
                <div className="flex flex-col w-5/6">
                    <h1 className="text-lg font-bold">{team.team_name}</h1>
                    <p className="text-gray-400 text-sm">{`${owner.first_name} ${owner.last_name}`}</p>
                    <p className="text-gray-400 text-sm">{`Seasons: ${statistics.seasons}`}</p>
                </div>
            </div>
            
            {
                data.map((element) => (
                    <Stat key={element.title}  title={element.title} statistic={element.stat} />
                ))
            }    
        </div>
    );
}
export default Card;