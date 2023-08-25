import { PortableText } from "@portabletext/react";

export default function Page({ data }) {
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
}

const date = formatDate(data._createdAt);

  return (
    <article className="prose mx-auto my-0 text-xs w-[90%]">
        <h1 className="m-0 text-lg">{data.title}</h1>
        <h3 className="mt-0 mb-7 text-xs text-gray-400">{date}</h3>
        <PortableText value={data.content} />
    </article>      
  );
}