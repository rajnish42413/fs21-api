
exports.up = function(knex, Promise) {
    return knex.schema.createTable('entity_locations', function(table) {
    table.increments();
    table.integer('entity_id').defaultTo(0);
    table.enum('entity_type', ['workspace', 'listing']).defaultTo('listing')
    table.string('address').nullable();
    table.string('landmarks').nullable();
    table.string('street').nullable();
    table.text('comment').nullable();
    table.integer('pincode').defaultTo(0);
    table.string('map').nullable(0);
    table.tinyint('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('listing_locations');
};