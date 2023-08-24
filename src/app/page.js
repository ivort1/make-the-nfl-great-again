import IonIcon from "@reacticons/ionicons";
import Image from "next/image";

export default function Home() {
  const announcements = [];
  return (
    <main className="w-full flex flex-col items-center justify-center gap-7">

      <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
          <h1 className="font-semibold text-lg">Make the NFL Great Again</h1>
          <Image src="/gif/ball.gif" alt="trophy" width={50} height={50}/>
      </div>

      <p className="w-[90%]">
          Fantasy football league founded in 2015.
      </p>

      <p className="w-[90%]">
          Reigning league champion: DEEZ NUTS
      </p>

      <div className="bg-red-100 rounded-md p-2 h-48 w-[90%]">
        <div className="flex flex-row items-center justify-start gap-2 h-1/6">
          <h3 className="text-red-500 text-base">Announcements</h3>
          <IonIcon name="megaphone-outline" className="text-base text-red-500"/>
        </div>

        {
          announcements.length > 0 ? <h1>Announcement 1</h1> :
          <div className="text-gray-500 flex flex-col items-center justify-center h-5/6">
            <IonIcon name="alert-circle-outline" className="text-base"/>
            <div>There are no announcements at this time.</div>
          </div>
        }

      </div>
    </main>
  )
}
