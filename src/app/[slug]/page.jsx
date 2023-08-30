import { getAnnouncement } from '../../../sanity/sanity-utils';
import Article from '../_components/article/page';

export default async function SlugPage({ params }) {
  const data = await getAnnouncement(params.slug);

  return (
    data && <Article data={data} />
  );
}

export async function getStaticProps() {
  const data = await getAnnouncement();

  return {
    props: { data },
    revalidate: 30
  }
}