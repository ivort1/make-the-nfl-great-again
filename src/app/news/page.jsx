"use client"

import Image from 'next/image';

export default function Page() {

    return(
        <div className="w-full flex flex-col items-center justify-center gap-7">
            <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                    <h1 className="font-semibold text-lg">News</h1>
                    <Image src="/gif/news.gif" alt="trophy" width={50} height={50}/>
            </div>

            <p className="w-[90%]">
                All-time statistics beginning with the 2017 season and the numbers are updated on a weekly basis. Regular season only.
            </p>

            <p className="w-[90%]">
                The 2015 and 2016 statistics are unavailable and not included in these calculations.
            </p>    
        </div>
    );
}