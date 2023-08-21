import IonIcon from '@reacticons/ionicons';

export default function Team({avatar, teamName, firstName, lastName, place}) {
    let avatarDimensions;
    
    switch(place) {
        case "first":
            place = "text-yellow-300 text-3xl";
            avatarDimensions = "w-[5rem] border-solid border-4 border-yellow-300";
            break;
        case "second":
            place = "text-gray-300 text-xl";
            avatarDimensions = "w-[3.5rem]";
            break;
        case "third":
            place = "text-amber-600 text-xl";
            avatarDimensions = "w-[3.5rem]";
            break;
    }

    return(
        <div className="flex flex-col w-1/3 items-center justify-start text-center">
            <IonIcon name={"trophy"} className={`${place}`}/>
            <img className={`${avatarDimensions} h-auto rounded-full mt-3`} src={avatar} />
            <h1 className="font-semibold text-xs">{teamName}</h1>
            <h1 className="text-gray-400 text-xs">{`${firstName} ${lastName}`}</h1>
        </div>
    );
}