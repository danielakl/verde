
exports.up = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        knex.schema.hasTable('comments').then(result => {
            if (result) {
                knex.schema.alterTable('comments', table => {
                    table.text('text').notNull().alter();
                })
                    .then(() => resolve())
                    .catch(error => reject(error));
            } else {
                reject("Missing table 'comments'.");
            }
        }).catch(error => reject(error));
    });
};

exports.down = function(knex, Promise) {
    return new Promise((resolve, reject) => {
        knex.schema.hasTable('comments').then(result => {
            if (result) {
                knex.schema.alterTable('comments', table => {
                    table.string('text').notNull().alter();
                })
                    .then(() => resolve())
                    .catch(error => reject(error));
            } else {
                reject("Missing table 'comments'.");
            }
        }).catch(error => reject(error));
    });
};
