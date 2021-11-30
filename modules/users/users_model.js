const db = require ('../../config/db_config');

const users = db.sequelize.define('users', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: db.DataTypes.STRING
  },
  first_name: {
    type: db.DataTypes.STRING,
  },
  last_name: {
    type: db.DataTypes.STRING,
  },
  email: {
    type: db.DataTypes.STRING,
    required: true,
    unique: true
  },
  country: {
    type: db.DataTypes.STRING
  },
  profile_pic: {
    type: db.DataTypes.STRING
  },
  profile_banner: {
    type: db.DataTypes.STRING
  },
  mobile_banner: {
    type: db.DataTypes.STRING
  },
  profile_url: {
    type: db.DataTypes.STRING
  },
  profile_bio: {
    type: db.DataTypes.TEXT
  },
  isProfilePublic: {
    type: db.DataTypes.BOOLEAN,
    defaultValue: 0
  },
  instagram_link: {
    type: db.DataTypes.STRING
  },
  facebook_link: {
    type: db.DataTypes.STRING
  },
  twitter_link: {
    type: db.DataTypes.STRING
  },
  discord_link: {
    type: db.DataTypes.STRING
  },
  youtube_link: {
    type: db.DataTypes.STRING
  },
  website_link: {
    type: db.DataTypes.STRING
  },
  password: {
    type: db.DataTypes.STRING,
  },
  role: {
    type: db.DataTypes.STRING,
    required: true
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: 0
  },
  createdAt: db.DataTypes.DATE,
  updatedAt: db.DataTypes.DATE,
}, { tableName: 'users' });

module.exports = users;
