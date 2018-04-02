// @flow
"use strict";

import Category from '../models/Category';

class CategoryDAO {
    static getCategory(id: number):Promise<Category> {
        return Category.query().findById(id);
    }

    static getCategories():Promise<Category[]> {
        return Category.query().orderBy('categories.category', 'ASC');
    }
}

export default CategoryDAO;