import Image from 'next/image';
import Champion from './_components/home/Champion';
import Announcements from './_components/home/Announcements';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="w-full flex flex-col items-center justify-center gap-7">
            <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                <h1 className="font-semibold text-lg">Make the NFL Great Again</h1>
                <Image src="/gif/ball.gif" alt="football" width={50} height={50}/>
            </div>

            <p className="w-[90%]">Welcome to our fantasy football league. Started in 2015 by <a href="https://www.linkedin.com/in/ivanortiz93" rel="noopener noreferrer" target="_blank" className="underline">Ivan Ortiz</a>, we’re a group of 10 playing in a super flex league on Sleeper.</p>

            <p className="w-[90%]">This website helps us track stats, share league news, and remember our past champions.</p>

            <p className="w-[90%]">
              The site is custom-built and you can check out the source code on <a href="https://github.com/ivort1/make-the-nfl-great-again" rel="noopener noreferrer" target="_blank" className="underline">GitHub</a>.
            </p>

            <Link href="/test-route">
              <button className="bg-red-100 px-3 py-2 text-red-500 rounded-md">Test-route</button>
            </Link>

            <Champion />

            <Announcements />
        </main>
  );
}