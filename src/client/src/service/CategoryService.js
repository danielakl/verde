// @flow
'use strict';

import Category from "../DTO/Category";

class CategoryService {
    static getCategories(): Promise<Category[]> {
        return fetch('/api/category').then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }

    static getCategory(id: number): Promise<Category> {
        return fetch('/api/category/' + id).then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        });
    }
}

export default CategoryService;
