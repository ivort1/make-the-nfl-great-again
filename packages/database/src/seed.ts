import "dotenv/config";
import { createDb } from "./index";
import { owner, season, team, matchup } from "./schema/schema";

const db = createDb(process.env.DATABASE_URL!);

async function seed() {
    // Clear existing data (order matters due to foreign keys)
    await db.delete(matchup);
    await db.delete(team);
    await db.delete(season);
    await db.delete(owner);

    console.log("🗑️  Cleared existing data");

    const owners = await db.insert(owner).values([
        { displayName: "Ivun", sleeperId: "199929890655440896" },
        { displayName: "lcar94", sleeperId: "471367537183944704" },
        { displayName: "cortiz18", sleeperId: "861325213470703616" },
        { displayName: "macardenas05", sleeperId: "994111795772063744" },
        { displayName: "MarcoS10X", sleeperId: "995524808018399232" },
        { displayName: "angelortits", sleeperId: "1051335842372915200" }
    ]).returning();

    console.log(`✅ Inserted ${owners.length} owners`);

    const seasons = await db.insert(season).values([
        { year: 2025, playoffSlots: 6, leagueFee: "100.00" },
        { year: 2024, playoffSlots: 6, leagueFee: "100.00" },
    ]).returning();

    console.log(`✅ Inserted ${seasons.length} seasons`);

    const teams = await db.insert(team).values([
        // 2025 (seasons[0])
        { ownerId: owners[0].id, seasonId: seasons[0].id, rosterId: 1, teamName: "DEEZ NUTS" },
        { ownerId: owners[1].id, seasonId: seasons[0].id, rosterId: 2, teamName: "ACTION JAXSON" },
        { ownerId: owners[2].id, seasonId: seasons[0].id, rosterId: 3, teamName: "Unsolicited Dak Pics" },
        { ownerId: owners[3].id, seasonId: seasons[0].id, rosterId: 4, teamName: "TWoHAnD tOUcH 👐🏼" },
        { ownerId: owners[4].id, seasonId: seasons[0].id, rosterId: 5, teamName: "Practice Squad" },
        { ownerId: owners[5].id, seasonId: seasons[0].id, rosterId: 6, teamName: "DeshaunDontTouchdownThere" },
        // 2024 (seasons[1])
        { ownerId: owners[0].id, seasonId: seasons[1].id, rosterId: 1, teamName: "DEEZ NUTS" },
        { ownerId: owners[1].id, seasonId: seasons[1].id, rosterId: 2, teamName: "ACTION JAXSON" },
        { ownerId: owners[2].id, seasonId: seasons[1].id, rosterId: 3, teamName: "Unsolicited Dak Pics" },
        { ownerId: owners[3].id, seasonId: seasons[1].id, rosterId: 4, teamName: "TWoHAnD tOUcH 👐🏼" },
        { ownerId: owners[4].id, seasonId: seasons[1].id, rosterId: 5, teamName: "Practice Squad" },
        { ownerId: owners[5].id, seasonId: seasons[1].id, rosterId: 6, teamName: "DeshaunDontTouchdownThere" }
    ]).returning();

    console.log(`✅ Inserted ${teams.length} teams`);

    // Teams index reference:
    // 2025: teams[0-5] (Ivun, lcar94, cortiz18, macardenas05, MarcoS10X, angelortits)
    // 2024: teams[6-11] (same order)

    await db.insert(matchup).values([
        // === 2025 SEASON (seasons[0]) ===
        // Week 1: 3 matchups (6 teams = 3 games)
        // Game 1: Ivun vs lcar94
        { seasonId: seasons[0].id, teamId: teams[0].id, week: 1, matchupGroupId: 1, points: "142.56" },
        { seasonId: seasons[0].id, teamId: teams[1].id, week: 1, matchupGroupId: 1, points: "128.94" },
        // Game 2: cortiz18 vs macardenas05
        { seasonId: seasons[0].id, teamId: teams[2].id, week: 1, matchupGroupId: 2, points: "167.32" },
        { seasonId: seasons[0].id, teamId: teams[3].id, week: 1, matchupGroupId: 2, points: "89.78" },
        // Game 3: MarcoS10X vs angelortits
        { seasonId: seasons[0].id, teamId: teams[4].id, week: 1, matchupGroupId: 3, points: "115.44" },
        { seasonId: seasons[0].id, teamId: teams[5].id, week: 1, matchupGroupId: 3, points: "134.22" },

        // Week 2: Different matchups
        // Game 1: Ivun vs cortiz18
        { seasonId: seasons[0].id, teamId: teams[0].id, week: 2, matchupGroupId: 1, points: "156.88" },
        { seasonId: seasons[0].id, teamId: teams[2].id, week: 2, matchupGroupId: 1, points: "148.36" },
        // Game 2: lcar94 vs MarcoS10X
        { seasonId: seasons[0].id, teamId: teams[1].id, week: 2, matchupGroupId: 2, points: "91.24" },
        { seasonId: seasons[0].id, teamId: teams[4].id, week: 2, matchupGroupId: 2, points: "103.66" },
        // Game 3: macardenas05 vs angelortits
        { seasonId: seasons[0].id, teamId: teams[3].id, week: 2, matchupGroupId: 3, points: "172.14" },
        { seasonId: seasons[0].id, teamId: teams[5].id, week: 2, matchupGroupId: 3, points: "81.50" },

        // === 2024 SEASON (seasons[1]) ===
        // Week 1
        // Game 1: Ivun vs angelortits
        { seasonId: seasons[1].id, teamId: teams[6].id, week: 1, matchupGroupId: 1, points: "138.92" },
        { seasonId: seasons[1].id, teamId: teams[11].id, week: 1, matchupGroupId: 1, points: "144.18" },
        // Game 2: lcar94 vs macardenas05
        { seasonId: seasons[1].id, teamId: teams[7].id, week: 1, matchupGroupId: 2, points: "162.74" },
        { seasonId: seasons[1].id, teamId: teams[9].id, week: 1, matchupGroupId: 2, points: "97.82" },
        // Game 3: cortiz18 vs MarcoS10X
        { seasonId: seasons[1].id, teamId: teams[8].id, week: 1, matchupGroupId: 3, points: "121.06" },
        { seasonId: seasons[1].id, teamId: teams[10].id, week: 1, matchupGroupId: 3, points: "109.58" },

        // Week 2
        // Game 1: Ivun vs macardenas05
        { seasonId: seasons[1].id, teamId: teams[6].id, week: 2, matchupGroupId: 1, points: "85.34" },
        { seasonId: seasons[1].id, teamId: teams[9].id, week: 2, matchupGroupId: 1, points: "151.62" },
        // Game 2: lcar94 vs cortiz18
        { seasonId: seasons[1].id, teamId: teams[7].id, week: 2, matchupGroupId: 2, points: "174.28" },
        { seasonId: seasons[1].id, teamId: teams[8].id, week: 2, matchupGroupId: 2, points: "166.94" },
        // Game 3: MarcoS10X vs angelortits
        { seasonId: seasons[1].id, teamId: teams[10].id, week: 2, matchupGroupId: 3, points: "112.46" },
        { seasonId: seasons[1].id, teamId: teams[11].id, week: 2, matchupGroupId: 3, points: "129.78" },
    ]);

    console.log("✅ Inserted 24 matchups (2 seasons × 2 weeks × 6 teams)");

    console.log("\n🌱 Seed completed successfully!");
}

seed()
    .catch((error) => {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });