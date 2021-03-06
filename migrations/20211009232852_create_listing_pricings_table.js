const tablename = 'listing_pricings';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.string('entity').notNullable();
        t.float('amount').defaultTo(0);
        t.string('interval',15).defaultTo(0);
        t.integer('min').defaultTo(0);
        t.tinyint('max').default(0);
        t.boolean('is_default').defaultTo(0);
        t.boolean('status').defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};