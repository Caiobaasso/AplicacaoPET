import mysql from 'mysql2/promise';

export default async function conectar (){
    if(globalThis.pool !== undefined){
        return await global.pool.getConnection();
    }
    else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'pets',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 360000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        globalThis.pool = pool;
        return await pool.getConnection();
    }
}