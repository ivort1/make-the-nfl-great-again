import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export default function Page({ data }) {
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
  }

  const date = formatDate(data._createdAt);

  let avatarSrc = "helmet";

  switch(data.tags) {
    case("rules"):
      avatarSrc = "referee";
      break;
    default:
      avatarSrc = "helmet";
  }

  return (
    <article className="prose mx-auto my-0 text-sm w-[90%]">
        <h1 className="m-0 text-lg font-semibold">{data.title}</h1>
        <h3 className="mt-0 mb-7 text-xs text-gray-400">{date}</h3>
        <PortableText value={data.content} />
        <Image src={`/gif/${avatarSrc}.gif`} alt={avatarSrc} width={75} height={75} className="mx-auto"/>
    </article>      
  );
}