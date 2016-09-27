exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments(); // set up Primary Key ID field
    table.string('name');
    table.decimal('price');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
};
