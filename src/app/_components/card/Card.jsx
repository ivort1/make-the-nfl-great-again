import Stat from "@/app/statistics/_components/Stat";
import Image from "next/image";

export default function Card({ owner, team, statistics, data}) {
    const avatarUrl = team.avatar && team.avatar.startsWith("https://") ? team.avatar : `https://sleepercdn.com/avatars/${team.avatar}`;

    return(
        <div className="bg-white text-black p-8 rounded-md shadow-statsCard w-[90%] flex flex-col items-center justify-center gap-6">
            <div className="flex flex-row gap-3 items-center">
                <Image src={avatarUrl} width={60} height={60} alt="avatar" className="rounded-full" />
                <div className="flex flex-col w-5/6">
                    <h1 className="font-bold">{team.team_name}</h1>
                    <p className="text-gray-400">{`${owner.first_name} ${owner.last_name}`}</p>
                    <p className="text-gray-400">{`Seasons: ${statistics.seasons}`}</p>
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