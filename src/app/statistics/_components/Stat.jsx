export default function Stat({title, statistic}) {
    return(
        <div className="flex flex-row w-full items-center">
            <span className="text-gray-400 uppercase w-3/6">{title}</span>
            <span className="bg-gray-100 font-semibold rounded-md p-2 w-3/6 flex items-center justify-center">{statistic}</span>
        </div>
    );
}