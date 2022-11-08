const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Blog extends Model {
  //check  if userid?
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: "2022-01-17",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,

        // This is the column name of the referenced model
        key: "id",
        onDelet: "cascade",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;
