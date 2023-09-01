import Stat from "@/app/statistics/_components/Stat";
import Image from "next/image";

export default function Card({ user, statistics, data}) {
    return(
        <div className="bg-white text-black p-8 rounded-md shadow-statsCard w-[90%] flex flex-col items-center justify-center gap-6">
            <div className="flex flex-row items-center justify-start gap-3 w-full">
                <Image src={user.avatar} width={60} height={60} alt="avatar" className="rounded-full" />
                <div className="flex flex-col w-5/6">
                    <h1 className="font-bold">{user.team_name}</h1>
                    <p className="text-gray-400">{`${user.first_name} ${user.last_name}`}</p>
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