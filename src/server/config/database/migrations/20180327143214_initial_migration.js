
exports.up = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        Promise.all([
            knex.schema.hasTable('categories'),
            knex.schema.hasTable('articles'),
            knex.schema.hasTable('comments')
        ]).then(results => {
            if (!results[0]) {
                knex.schema.createTable('categories', table => {
                    table.increments('id').unsigned().primary();
                    table.string('category').notNull();
                    table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                    table.timestamp('updatedAt');
                }).then(() => {
                    if (!results[1]) {
                        knex.schema.createTable('articles', table => {
                            table.increments('id').unsigned().primary();
                            table.integer('categoryId').unsigned();
                            table.string('title').notNull();
                            table.string('abstract').notNull();
                            table.text('text', 'mediumtext').notNull();
                            table.integer('votes').unsigned().notNull().defaultTo(0);
                            table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                            table.timestamp('updatedAt');
                            table.foreign('categoryId').references('categories.id').onUpdate("CASCADE").onDelete('SET NULL');
                        }).then(() => {
                            if (!results[2]) {
                                knex.schema.createTable('comments', table => {
                                    table.increments('id').unsigned().primary();
                                    table.integer('articleId').unsigned().notNull();
                                    table.string('text').notNull();
                                    table.string('author').notNull().defaultTo('Anonymous');
                                    table.integer('votes').unsigned().notNull().defaultTo(0);
                                    table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                                    table.timestamp('updatedAt');
                                    table.foreign('articleId').references('articles.id').onUpdate("CASCADE").onDelete("CASCADE");
                                }).then(resolve).catch(reject)
                            } else {
                                resolve();
                            }
                        }).catch(reject);
                    }
                }).catch(reject);
            } else {
                if (!results[1]) {
                    knex.schema.createTable('articles', table => {
                        table.increments('id').unsigned().primary();
                        table.integer('categoryId').unsigned();
                        table.string('title').notNull();
                        table.string('abstract').notNull();
                        table.text('text', 'mediumtext').notNull();
                        table.integer('votes').unsigned().notNull().defaultTo(0);
                        table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                        table.timestamp('updatedAt');
                        table.foreign('categoryId').references('categories.id').onUpdate("CASCADE").onDelete('SET NULL');
                    }).then(() => {
                        if (!results[2]) {
                            knex.schema.createTable('comments', table => {
                                table.increments('id').unsigned().primary();
                                table.integer('articleId').unsigned().notNull();
                                table.string('text').notNull();
                                table.string('author').notNull().defaultTo('Anonymous');
                                table.integer('votes').unsigned().notNull().defaultTo(0);
                                table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                                table.timestamp('updatedAt');
                                table.foreign('articleId').references('articles.id').onUpdate("CASCADE").onDelete("CASCADE");
                            }).then(resolve).catch(reject)
                        } else {
                            resolve();
                        }
                    }).catch(reject);
                } else {
                    if (!results[2]) {
                        knex.schema.createTable('comments', table => {
                            table.increments('id').unsigned().primary();
                            table.integer('articleId').unsigned().notNull();
                            table.string('text').notNull();
                            table.string('author').notNull().defaultTo('Anonymous');
                            table.integer('votes').unsigned().notNull().defaultTo(0);
                            table.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
                            table.timestamp('updatedAt');
                            table.foreign('articleId').references('articles.id').onUpdate("CASCADE").onDelete("CASCADE");
                        }).then(resolve).catch(reject)
                    } else {
                        resolve();
                    }
                }
            }
        }).catch(reject);
    });
};

exports.down = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        knex.schema.dropTableIfExists('comments').then(() => {
            knex.schema.dropTableIfExists('articles').then(() => {
                knex.schema.dropTableIfExists('categories')
                    .then(() => resolve())
                    .catch(error => reject(error));
            }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
};
