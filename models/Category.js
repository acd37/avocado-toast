module.exports = function (sequelize, Sequelize) {
    const Category = sequelize.define("Category", {
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
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    Category.associate = function (models) {
        Category.hasMany(models.Transaction, {
            onDelete: "cascade"
        });
        Category.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Category;
};