const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// users hasmany blogs
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
//blog belongs to user
Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// users hasmany blogs
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
//comment belongs to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//blogs hasmany comments
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

module.exports = { User, Blog, Comment };
