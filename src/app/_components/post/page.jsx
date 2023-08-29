import Image from "next/image";

export default function Page({ tags, title, createdAt }) {

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return formattedDate;
    }

    const date = formatDate(createdAt);

    let svgName;

    switch(tags) {
        case("rankings"):
            svgName = "lightning";
            break;
        case("rules"):
            svgName = "referee";
            break;
        default:
            svgName = "football_colored";
    }

    return(
        <div className="bg-white text-black p-8 rounded-md shadow-statsCard flex items-center justify-start gap-3">
            <Image src={`/svg/${svgName}.svg`} alt={svgName} width={30} height={30} />
            <div>
                <h1 className="font-semibold">{title}</h1>
                <p className="text-gray-400">{date}</p>
            </div>
        </div>
    )
}