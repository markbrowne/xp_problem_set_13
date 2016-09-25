var cfenv = require("cfenv");

var defaults = {
  vcap: {
    services: {
      "mongo-p": [{
        "name": "mongo-development",
        "credentials": {
          "uri": "mongodb://localhost:27017/products_api_development"
        }
      }, {
        "name": "mongo-test",
        "credentials": {
          "uri": "mongodb://localhost:27017/products_api_test"
        }
      }]
    }
  }
};

module.exports = cfenv.getAppEnv(defaults);
