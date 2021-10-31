const tablename = 'listing_contacts';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.enum('entity_type', ['workspace', 'listing']).defaultTo('listing')
        t.string('name');
        t.string('designation').nullable();
        t.string('email').nullable();
        t.integer('mobile',15).defaultTo(0);
        t.integer('whatsapp',15).defaultTo(0);
        t.integer('city_id').defaultTo(0);
        t.tinyint('status').defaultTo(1);
        t.boolean('is_verified').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};