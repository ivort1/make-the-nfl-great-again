import Link from "next/link";

export default function Page() {
    return(
        <>
            <h1>This is just a test!</h1>
            <Link href="/">
                <button className="bg-red-100 px-3 py-2 text-red-500 rounded-md">Home</button>
            </Link>
        </>
    )
}