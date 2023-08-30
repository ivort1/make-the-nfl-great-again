import { getPost } from '../../../../sanity/sanity-utils';
import Article from '../../_components/article/page';
import Rankings from '../../_components/rankings/page';

export default async function SlugPage({ params }) {
  const data = await getPost(params.slug);

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