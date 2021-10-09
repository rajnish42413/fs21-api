
exports.up = function(knex, Promise) {
    return knex.schema.createTable('brands', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('slug').unique().notNullable();
    table.tinyint('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('brands');
};
