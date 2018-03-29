// @flow
"use strict";

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user: 'root',
            password: 'secret_password'
        },
        seeds: {
            directory: './seeds'
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user:     'root',
            password: 'secret_password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'verde',
            user:     'root',
            password: 'secret_password'
        },
        pool: {
            min: 2,
            max: 50
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
