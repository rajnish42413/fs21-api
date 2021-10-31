
const tablename = 'open_hours';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.enum('entity', ['workspace', 'listing']).defaultTo('listing')
        t.enum('day', ['sun','mon','tue','wed','thu','fri','sat'])
        t.time('opens_at')
        t.time('closes_at')
        t.boolean('is_open').defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};