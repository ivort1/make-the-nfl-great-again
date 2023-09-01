import Image from 'next/image';

export default function Team({avatar, teamName, firstName, lastName, place}) {
    let avatarDimensions = 56;
    let src;
    let width = 35;
    let height = 35;
    let avatarCss = "filter grayscale";
    
    switch(place) {
        case "first":
            avatarDimensions = 80;
            avatarCss = "border-solid border-4 border-[#FFE02F]";
            src = "/svg/trophy.svg";
            width = 40;
            height = 40;
            break;
        case "second":
            src = "/svg/second.svg";
            break;
        case "third":
            src = "/svg/third.svg";
            break;
    }

    return(
        <div className="flex flex-col w-1/3 items-center justify-start text-center">
            <div className="relative">
                <Image src={src} width={width} height={height} alt="trophy" className="absolute z-50 bottom-0 right-[-15px] drop-shadow-md" />
                <Image src={avatar} className={`${avatarCss} h-auto rounded-full`} width={avatarDimensions} height={avatarDimensions} alt="avatar" />
            </div>
            <h1 className="font-semibold mt-2">{teamName}</h1>
            <h1 className="text-gray-400">{`${firstName} ${lastName}`}</h1>
        </div>
    );
}