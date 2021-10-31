const tablename = 'cities';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.string('name');
        t.text('content').nullable();
        t.string('slug', 150).unique();
        t.integer('country_id').defaultTo(0);
        t.tinyint('status').default(1);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};