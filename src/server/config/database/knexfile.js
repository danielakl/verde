// @flow
"use strict";

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user: 'root',
            password: '38956'
        },
        seeds: {
            directory: './seeds'
        },
        migrations: {
            directory: './config/database/migrations'
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user:     'root',
            password: '38956'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './config/database/migrations'
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user:     'root',
            password: '38956'
        },
        pool: {
            min: 2,
            max: 50
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: "./config/database/migrations"
        }
    }
};
