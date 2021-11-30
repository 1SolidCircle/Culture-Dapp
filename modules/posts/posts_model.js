const db = require ('../../config/db_config');

const posts = db.sequelize.define('posts', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_discription: {
    type: db.DataTypes.STRING
  },
  pic_url: {
    type: db.DataTypes.STRING,
  },
  user_id: {
    type: db.DataTypes.INTEGER,
    required: true
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: 0
  },
  createdAt: db.DataTypes.DATE,
  updatedAt: db.DataTypes.DATE,
}, { underscored: true, tableName: 'posts' });

module.exports = posts;
