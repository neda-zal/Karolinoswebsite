//jshint esversion:6
var Sequelize = require('sequelize');
var Events = require('./events.js');

var sequelize = new Sequelize('rlZi7Nz9SV', 'rlZi7Nz9SV', 'HXbeyWjR86', {
	host: 'remotemysql.com',
	dialect: 'mysql'
});

var Proceduros = sequelize.define('Proceduros', {
	iduser: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoincrement: true
	},
	title: Sequelize.STRING
	}, {
	freezeTableName: true
});

Proceduros.associate = (models) => {
	Proceduros.BelongsTo(Events, {foreignKey : 'iduser'});
};

sequelize.sync()
    .then(() => console.log('proceduros table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Proceduros;
