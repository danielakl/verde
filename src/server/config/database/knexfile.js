// @flow
"use strict";

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: 'mysql.stud.iie.ntnu.no',
            database: 'g_tdat2003_t7',
            user: 'g_tdat2003_t7',
            password: 'nMzfg38c'
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
            host: 'mysql.stud.iie.ntnu.no',
            database: 'g_tdat2003_t7',
            user:     'g_tdat2003_t7',
            password: 'nMzfg38c'
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
            host: 'mysql.stud.iie.ntnu.no',
            database: 'g_tdat2003_t7',
            user:     'g_tdat2003_t7',
            password: 'nMzfg38c'
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
