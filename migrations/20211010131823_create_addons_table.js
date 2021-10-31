const tablename = 'addons';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.enum('entity', ['workspace', 'listing', 'city','area','']).defaultTo('listing')
        t.string('name')
        t.integer('amount').defaultTo(0)
        t.enum('type', ['fixed', 'person']).defaultTo('fixed')
        t.text('description').nullable();
        t.boolean('status').defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};