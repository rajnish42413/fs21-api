const tablename = 'search_stats';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.string('entity').notNullable();
        t.integer('impressions').defaultTo(0)
        t.integer('clicks').defaultTo(0)
        t.integer('user_session_id').defaultTo(0)
        t.string('url').nullable(0)
        t.enum('medium', ['web', 'app', 'in-app']).defaultTo('web')
        t.text('meta').nullable();
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};