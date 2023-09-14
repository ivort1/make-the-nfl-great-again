"use client"

import Link from 'next/link';
import Image from 'next/image';
import Post from '../_components/post/page';
import { useContext } from 'react';
import { ThemeContext } from '../theme-provider';

export default function Page() {
    const { posts } = useContext(ThemeContext);
    
    posts.length > 0 && 
    posts.sort((a, b) => {
        let dateA = new Date(a._createdAt);
        let dateB = new Date(b._createdAt);
        
        if (dateA < dateB) {
          return 1;
        }
        
        if (dateA > dateB) {
          return -1;
        }
        
        return 0;
      });

    return(
        <div className="flex flex-col items-center justify-center w-full gap-7">
            <div className="flex flex-row items-center justify-start gap-5 w-[90%]">
                <h1 className="text-lg font-semibold">Blog</h1>
                <Image src="/gif/news.gif" alt="newspaper" width={50} height={50}/>
            </div>

            <p className="w-[90%]">
                Power rankings, articles, general news and updates about the league.
            </p>

            {
                posts.length > 0 ?
                posts.sort((a, b) => b._createdAt - a._createdAt).map(post => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`} className="w-[90%]">
                        <Post tags={post.tags} title={post.title} createdAt={post._createdAt} />
                    </Link>
                ))
                :
                <div className="flex flex-row items-center w-3/4 mx-auto text-gray-500 mt-7">
                    <Image src="/svg/strategy.svg" width={50} height={50} alt="football strategy" />
                    <div className="ml-5">
                        Nothing posted yet.
                        <br />Check back later!
                    </div>
                </div>
            }
        </div>
    );
}