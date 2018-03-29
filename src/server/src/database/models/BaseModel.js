// @flow
"use strict";

import {Model} from 'objection';

class BaseModel extends Model {
    createdAt: string;
    updatedAt: string;

    constructor() {
        super();
    }

    $beforeInsert() {
        this.createdAt = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }
}

export default BaseModel;