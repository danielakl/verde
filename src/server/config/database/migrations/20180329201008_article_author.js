
exports.up = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        knex.schema.hasTable('articles').then(result => {
            if (result) {
                knex.schema.table('articles', table => {
                    table.string('author').notNull().defaultTo('Anonymous');
                })
                .then(() => resolve())
                .catch(error => reject(error));
            } else {
                reject("Missing table 'articles'.");
            }
        }).catch(error => reject(error));
    });
};

exports.down = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        knex.schema.hasTable('articles').then(result => {
            if (result) {
                knex.schema.table('articles', table => {
                    table.dropColumn('author');
                })
                .then(() => resolve())
                .catch(error => reject(error));
            } else {
                reject("Missing table 'articles'.");
            }
        }).catch(error => reject(error));
    });
};
