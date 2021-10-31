const tablename = 'facilities';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.enum('entity', ['workspace', 'listing']).defaultTo('listing')
        t.string('name')
        t.string('icon')
        t.string('slug').unique().notNullable();
        t.boolean('status').defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};