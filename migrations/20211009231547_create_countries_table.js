const tablename = 'countries';
exports.up = function(knex, Promise) {
    return knex.schema.createTable(tablename, t => {
        t.increments('id').index();
        t.string('name');
        t.string('iso2').nullable();
        t.string('iso3').nullable();
        t.string('phonecode').nullable();
        t.string('capital').nullable();
        t.string('currency').nullable();
        t.string('native').nullable();
        t.string('region').nullable();
        t.string('subregion').nullable();
        t.string('emoji').nullable();
        t.string('emojiU').nullable();
        t.string('wikiDataId').nullable();
        t.tinyint('status').defaultTo(1);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tablename);
};
