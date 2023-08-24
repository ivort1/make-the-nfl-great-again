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
            avatarCss = "border-solid border-4 border-[#FFD731]";
            src = "/svg/first.svg";
            width = 50;
            height = 50;
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
            <Image src={src} width={width} height={height} alt="trophy" />
            <Image src={avatar} className={`${avatarCss} h-auto rounded-full mt-3`} width={avatarDimensions} height={avatarDimensions} alt="avatar" />
            <h1 className="font-semibold">{teamName}</h1>
            <h1 className="text-gray-400">{`${firstName} ${lastName}`}</h1>
        </div>
    );
}