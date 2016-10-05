var db = require('../config/db');

module.exports = db.Model.extend({
    tableName: 'products'
});
