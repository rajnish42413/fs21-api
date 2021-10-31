const tablename = 'media';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.integer('entity_id').defaultTo(0);
        t.enum('entity', ['workspace', 'listing', 'categories', 'city']).defaultTo('listing')
        t.float('amount').defaultTo();
        t.string('thumb').nullable();
        t.string('small').nullable();
        t.string('medium').nullable();
        t.string('large').nullable();
        t.string('original').nullable();
        t.string('caption').nullable();
        t.string('label').nullable();
        t.boolean('default').defaultTo(0);
        t.boolean('status').defaultTo(1);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};
