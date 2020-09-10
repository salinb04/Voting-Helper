module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "compositeIndex",
      references: {
        model: "Users",
        key: "id",
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex",
    },
  });

  return Category;
};
