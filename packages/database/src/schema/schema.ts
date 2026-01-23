import { decimal, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// ----- Owner -----
export const owner = pgTable("owner", {
    id: uuid("id").primaryKey().defaultRandom(),
    sleeperId: varchar("sleeper_id", { length: 255 }).unique(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ----- Season -----
export const platformEnum = pgEnum("platform_type", ["sleeper", "espn", "yahoo", "manual"]);

export const season = pgTable("season", {
    id: uuid("id").primaryKey().defaultRandom(),
    year: integer("year").notNull().unique(),
    platform: platformEnum().default("sleeper"),
    playoffSlots: integer("playoff_slots").notNull(),
    leagueFee: decimal("league_fee", { precision: 10, scale: 2 }).default("0.00"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});