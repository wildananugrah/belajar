import { Client, Pool } from "pg";

const connectionString: string = `postgres://belajar:p@ssword@localhost:5432/postgres`;

import {
    dbConnectionTimeout,
    dbDatabase,
    dbIdleTimeout,
    dbMaxUses,
    dbPass,
    dbPoolMax,
    dbPoolMin,
    dbPort,
    dbUser,
    dbhost,
  } from "./configs/db.config";

const config = {
    host: dbhost,
    database: dbDatabase,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    ssl: false,
    min: dbPoolMin,
    max: dbPoolMax,
    idleTimeoutMillis: dbIdleTimeout,
    connectionTimeoutMillis: dbConnectionTimeout,
    maxUses: dbMaxUses,
};
  
const pool = new Pool(config);

const client = new Client({
    connectionString: connectionString,
});

async function run(){
    // const client = await pool.connect();
    await client.connect();
    await client.query("LISTEN new_testevent");
    
    client.on('notification', async (data) => {
        const payload = JSON.parse(data.payload !== undefined ? data.payload : "");
        console.log(payload);
    });

    client.on('error', (err) => {
        console.error('Client error:', err);
    });
}

console.log("Listening...");
run();

  