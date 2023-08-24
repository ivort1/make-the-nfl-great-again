import { createClient } from "next-sanity";
export default async function IndexPage() {
    const client = createClient({
        projectId: "u0mvwzej",
        dataset: "production",
        apiVersion: "2023-08-23",
        useCdn: false
      });

  const rankings = await client.fetch(`*[_type == "rankings"]`);


    rankings && console.log(rankings);
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>pets</h2>
        {rankings.length > 0 && (
          <ul>
            {rankings.map((ranking) => (
              <li key={ranking._id}>{ranking?.name}</li>
            ))}
          </ul>
        )}
        {!rankings.length > 0 && <p>No pets to show</p>}
        {rankings.length > 0 && (
          <div>
            <pre>{JSON.stringify(rankings, null, 2)}</pre>
          </div>
        )}
        {!rankings.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}


