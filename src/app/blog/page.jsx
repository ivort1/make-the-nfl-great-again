import { client } from '../../../sanity/lib/client';
import Link from 'next/link';

import Image from 'next/image';
import Post from '../_components/post/page';

async function getDataFromSanity() {
    const query = `*[_type == "rankings" || _type=="article"]`;
    const data = await client.fetch(query);

    return data;
}

export default async function Page() {
    const data = await getDataFromSanity();

    return(
        <div className="w-full flex flex-col items-center justify-center gap-7">
            <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                <h1 className="font-semibold text-lg">Blog</h1>
                <Image src="/gif/news.gif" alt="newspaper" width={50} height={50}/>
            </div>

            <p className="w-[90%]">
                Power rankings, articles, general news and updates about the league.
            </p>

            {
                data.map(post => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`} className="w-[90%]">
                        <Post type={post._type} title={post.title} createdAt={post._createdAt} />
                    </Link>
                ))
            }
        </div>
    );
}