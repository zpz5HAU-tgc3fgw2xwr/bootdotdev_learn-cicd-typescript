import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { config } from "../config.js";
import * as schema from "./schema.js";

let conn = undefined;

export function assertDbConnection() {
    if (!db) {
        throw new Error("Database connection is not available");
    }
}

export function openDBConnection() {
    if (config.db.url) {
        conn = drizzle({
            connection: {
                url: config.db.url,
            },
            schema: schema,
        });
        console.log("Connected to database!")
    }
}

export const db: LibSQLDatabase | undefined = conn;
