module.exports = function(sequelize, Sequelize) {
	const Transaction = sequelize.define('Transaction', {
		transaction_id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		amount: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false
		}
	});

	Transaction.associate = function(models) {
		Transaction.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
		Transaction.belongsTo(models.Category, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Transaction;
};
