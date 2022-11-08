const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Blog = require("./Blog");
const User = require("./User");

class Comment extends Model {
  //check  if userid?
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
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
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: Blog,

        // This is the column name of the referenced model
        key: "id",
        onDelet: "cascade",
      },
    },
    // comment_creater: {
    //   type: DataTypes.STRING,
    //   references: {
    //     // This is a reference to another model
    //     model: User,

    //     // This is the column name of the referenced model
    //     key: "name",
    //     onDelet: "cascade",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
