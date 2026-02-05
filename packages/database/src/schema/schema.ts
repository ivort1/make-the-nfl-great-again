import {
    boolean,
    decimal,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

// ----- Owner -----
export const owner = pgTable("owner", {
    id: uuid("id").primaryKey().defaultRandom(),
    sleeperId: varchar("sleeper_id", { length: 255 }).unique(),
    displayName: varchar("display_name", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ----- Season -----
export const platformEnum = pgEnum("platform_type", ["sleeper", "espn", "yahoo", "manual"]);
export const statusEnum = pgEnum("status_type", ["pre_season", "in_season", "complete", "cancelled"]);

export const season = pgTable("season", {
    id: uuid("id").primaryKey().defaultRandom(),
    year: integer("year").notNull().unique(),
    leagueId: varchar("league_id").unique(),
    platform: platformEnum("platform").default("sleeper"),
    status: statusEnum("status").default("in_season"),
    playoffSlots: integer("playoff_slots").notNull(),
    leagueFee: decimal("league_fee", { precision: 10, scale: 2 }).default("0.00"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
});

// ----- Team -----
export const team = pgTable("team", {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id").notNull().references(() => owner.id, {onDelete: "cascade" }),
    seasonId: uuid("season_id").notNull().references(() => season.id, { onDelete: "cascade" }),
    teamName: varchar("team_name").notNull(),
    teamPhotoUrl: text("team_photo_url"),
    rosterId: integer("roster_id"),
    regularSeasonStanding: integer("regular_season_standing"),
    finalStanding: integer("final_standing"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow()
}, (table) => [
    uniqueIndex("unq_idx_team_owner_id_season_id").on(table.ownerId, table.seasonId),
    uniqueIndex("unq_idx_team_season_id_roster_id").on(table.seasonId, table.rosterId),
    uniqueIndex("unq_idx_team_season_id_regular_season_standing").on(table.seasonId, table.regularSeasonStanding),
    uniqueIndex("unq_idx_team_season_id_final_standing").on(table.seasonId, table.finalStanding),
    index("idx_team_season_id").on(table.seasonId)
]);

// ----- Matchup -----
export const matchupTypeEnum = pgEnum("matchup_type", ["regular", "playoff", "consolation"]);

export const matchup = pgTable("matchup", {
    id: uuid("id").primaryKey().defaultRandom(),
    seasonId: uuid("season_id").notNull().references(() => season.id),
    teamId: uuid("team_id").notNull().references(() => team.id),
    week: integer("week").notNull(),
    matchupGroupId: integer("matchup_group_id").notNull(),
    points: decimal("points", { precision: 5, scale: 2 }).default("0.00").notNull(),
    type: matchupTypeEnum("type").default("regular"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
}, (table) => [
    uniqueIndex("unq_idx_matchup_team_id_week").on(table.teamId, table.week),
    index("idx_matchup_team_id").on(table.teamId),
    index("idx_matchup_season_week").on(table.seasonId, table.week)
])

// ----- Sync Log -----
export const syncLog = pgTable("synclog", {
    id: uuid("id").primaryKey().defaultRandom(),
    seasonYear: integer("season_year").notNull(),
    seasonWeek: integer("season_week").notNull(),
    syncedAt: timestamp("synced_at", { withTimezone: true }).defaultNow(),
    status: varchar("status", { length: 50 }).notNull(),
    errorMessage: text("error_message"),
    matchupsAdded: integer("matchups_added").default(0)
}, (table) => [
    uniqueIndex("unq_idx_sync_log_season_year_season_week").on(table.seasonYear, table.seasonWeek)
])