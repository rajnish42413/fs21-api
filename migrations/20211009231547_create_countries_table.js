const tablename = 'countries';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.string('currency', 50);
        t.string('name');
        t.string('currency_symbol',100);
        t.string('code',20);
        t.string('language',10).nullable();
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};