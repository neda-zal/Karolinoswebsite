//jshint esversion:6
var Sequelize = require('sequelize');
var Proceduros = require('./proceduros.js');

var sequelize = new Sequelize('rlZi7Nz9SV', 'rlZi7Nz9SV', 'HXbeyWjR86', {
	host: 'remotemysql.com',
	dialect: 'mysql'
});

	var Events = sequelize.define('Events', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoincrement: true
		},
    vardas: Sequelize.STRING,
    pavarde: Sequelize.STRING,
    elpastas: Sequelize.STRING,
    telnumeris: Sequelize.STRING,
		kaina: Sequelize.INTEGER,
		laikasnuo: Sequelize.DATE,
		laikasiki: Sequelize.DATE
    }, {
    freezeTableName: true
  });

Events.associate = (models) => {
 Events.hasMany(Proceduros, {as : 'Proceduros', foreignKey : 'iduser'});
};

sequelize.sync()
    .then(() => console.log('events table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Events;
