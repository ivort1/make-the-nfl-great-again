import { client } from '../../../sanity/lib/client';
import Article from '../_components/article/page';

async function getData(slug) {
  const query = `*[_type == "announcement" && slug.current == "${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function SlugPage({ params }) {
  const data = (await getData(params.slug));

  return (
    <Article data={data} />
  );
}