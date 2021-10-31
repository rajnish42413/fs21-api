
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('name', 255).notNullable();
    table.integer('phone', 13).notNullable();
    table.string('country_code', 4).notNullable();
    table.integer('country_id', 4).notNullable();
    table.enum('type', ['admin', 'host', 'user']).defaultTo('user')
    table.tinyint('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
