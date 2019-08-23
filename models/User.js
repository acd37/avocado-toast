module.exports = function(sequelize, Sequelize) {
	const User = sequelize.define('User', {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'last_name'
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		monthlyIncome: {
			type: Sequelize.DECIMAL(10, 2),
			defaultValue: 0.0,
			field: 'monthly_income'
		},
		remainingBalance: {
			type: Sequelize.DECIMAL(10, 2),
			defaultValue: 0.0,
			field: 'remaining_balance'
		}
	});

	User.associate = function(models) {
		User.hasMany(models.Transaction, {
			onDelete: 'cascade'
		});
		User.hasMany(models.Category, {
			onDelete: 'cascade'
		});
	};

	return User;
};
