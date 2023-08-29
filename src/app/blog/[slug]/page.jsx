import { client } from '../../../../sanity/lib/client';
import Article from '../../_components/article/page';
import Rankings from '../../_components/rankings/page';

async function getData(slug) {
  const query = `*[(_type == "article" || _type== "rankings" || _type== "announcement") && slug.current == "${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function SlugPage({ params }) {
  const data = (await getData(params.slug));

  return (
    <>
      {
        (data._type === "article" || data._type === "announcement") && <Article data={data} />
      }
      {
        data._type === "rankings" && <Rankings data={data} />
      }
    </>
  );
}