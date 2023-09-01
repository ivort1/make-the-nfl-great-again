import Team from "./Team";

export default function Card({ data, firstPlaceAvatar, secondPlaceAvatar, thirdPlaceAvatar }) {
    return(
        <div className="flex flex-col items-center justify-center text-black rounded-md w-full gap-3">
            <h1 className="font-bold w-full bg-gray-200 text-gray-500 pl-2 text-xs">{data.season}</h1>
            <div className="flex flex-row items-center justify-center backdrop:gap-1 text-xs w-full">
                <Team
                    avatar={secondPlaceAvatar}
                    teamName={data.second_place.team}
                    firstName={data.second_place?.first_name}
                    lastName={data.second_place?.last_name}
                    place={"second"}
                />

                <Team
                    avatar={firstPlaceAvatar}
                    teamName={data.first_place.team}
                    firstName={data.first_place?.first_name}
                    lastName={data.first_place?.last_name}
                    place={"first"}
                />

                <Team
                    avatar={thirdPlaceAvatar}
                    teamName={data.third_place.team}
                    firstName={data.third_place?.first_name}
                    lastName={data.third_place?.last_name}
                    place={"third"}
                />
            </div>
        </div>
    );
}