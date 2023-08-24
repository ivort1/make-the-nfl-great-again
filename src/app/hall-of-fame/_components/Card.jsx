import Team from "./Team";

export default function Card({ data, firstPlaceAvatar, secondPlaceAvatar, thirdPlaceAvatar }) {
    return(
        <div className="flex flex-col bg-white text-black rounded-md gap-5 w-full">
            <h1 className="font-bold w-full bg-gray-100 text-gray-500 pl-2">{data.season}</h1>
            <div className="flex flex-row gap-1 w-full">
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