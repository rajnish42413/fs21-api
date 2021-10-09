
exports.up = function(knex, Promise) {
    return knex.schema.createTable('listings', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('slug').unique().notNullable();
    table.string('workspace_id').nullable();
    table.text('about').nullable();
    table.text('description').nullable();
    table.decimal('latitude',14 , 2).nullable();
    table.decimal('longitude',14 , 2).nullable();
    table.integer('capacity').defaultTo(0);
    table.integer('city_id').defaultTo(0);
    table.integer('area_id').defaultTo(0);
    table.integer('country_id').defaultTo(0);
    table.integer('host_id').defaultTo(0);
    table.integer('brand_id').defaultTo(0);
    table.tinyint('status').defaultTo(0);
    table.float('listing_scores').defaultTo(0);
    table.boolean('confirm_required').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('listings');
};