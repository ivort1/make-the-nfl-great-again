import { getAnnouncements } from '../../../../sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function Announcements() {
    const announcements = await getAnnouncements();
    const pinnedAnnouncements = announcements.filter(announcement => announcement.pin === true);

    return(
        <div className="mt-5 mb-9 w-[90%] flex flex-col gap-4">
              <div className="flex flex-row items-center justify-start gap-2 h-1/6">
                  <h3 className="text-red-500 text-base font-semibold">Announcements</h3>
                  <Image src="/svg/megaphone.svg" width={25} height={25} alt="megaphone" />
              </div>

                {
                    pinnedAnnouncements.length > 0 ?
                    pinnedAnnouncements.map(announcement => (
                        <Link key={announcement._id} href={`/${announcement.slug.current}`} className="flex flex-row gap-2 items-center">
                            <Image src="/svg/football.svg" width={12} height={12} alt="football" />
                            <h1 className="underline underline-offset-2">{announcement.title}</h1>
                        </Link>
                    ))
                    :
                    <div className="mt-7 mx-auto text-gray-500 flex flex-row items-center w-3/4">
                        <Image src="/svg/strategy.svg" width={50} height={50} alt="football strategy" />
                        <div className="ml-5">There are no announcements at this time.</div>
                    </div>
                }
        </div>
    );
}