// @flow
"use strict";

import {Model} from 'objection';

class BaseModel extends Model {
    createdAt: string;
    updatedAt: string;

    constructor() {
        super();
    }

    static formatDate(date: Date):string {
        const year = `${date.getFullYear()}`.padStart(4, '0');
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        const second = `${date.getSeconds()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    $beforeInsert() {
        this.createdAt = BaseModel.formatDate(new Date());
    }

    $beforeUpdate() {
        this.updatedAt = BaseModel.formatDate(new Date());
    }
}

export default BaseModel;