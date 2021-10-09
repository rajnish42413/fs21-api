
exports.up = function(knex, Promise) {
    return knex.schema.createTable('workspaces', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('slug').unique().notNullable();
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
    table.tinyint('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('workspaces');
};