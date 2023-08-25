import { client } from "../../../../sanity/lib/client";

async function getData(slug) {
    const query = `*[_type == "rankings" && slug.current == "${slug}"][0]`;
    const data = await client.fetch(query);
    return data;
  }
  
  export default async function SlugPage({params}) {
    const data = (await getData(params.slug));
  
    return (
      <div className="">
        <h1>{data.title}</h1>      
      </div>
    );
  }
