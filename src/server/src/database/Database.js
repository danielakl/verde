// @flow
"use strict";

import Knex from 'knex';
import {Model} from 'objection';
import {development, staging, production} from '../../config/database/knexfile';

export default function initialize() {
    let config;
    switch(process.env.ENVIRONMENT) {
        case 'staging':
            config = staging;
            break;
        case 'production':
            config = production;
            break;
        default:
            config = development;
            break;
    }
    const knex = Knex(config);

    knex.migrate.latest().then(() => {
        Model.knex(knex);
    }).catch(error => console.error(error));
}
