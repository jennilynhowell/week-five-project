'use strict';
module.exports = function(sequelize, DataTypes) {
  var Winner = sequelize.define('Winner', {
    name: DataTypes.STRING,
    winning_word: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Winner;
};