exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', function(table) {
        table.increments(); // set up Primary Key ID field
        table.string('name');
        table.string('description');
        table.float('price');
        table.string('category');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products')
};
