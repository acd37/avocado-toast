module.exports = function(sequelize, Sequelize) {
	const Category = sequelize.define('Category', {
		category_id: {
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
			defaultValue: 0.0
		}
	});

	Category.associate = function(models) {
		Category.hasMany(models.Transaction, {
			onDelete: 'cascade'
		});
		Category.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Category;
};
