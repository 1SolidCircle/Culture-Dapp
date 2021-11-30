const db = require ('../../config/db_config');

const tracks = db.sequelize.define('tracks', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: db.DataTypes.INTEGER,
    required: true
  },
  track: {
    type: db.DataTypes.STRING,
  },
  track_pic: {
    type: db.DataTypes.STRING,
  },
  artist: {
    type: db.DataTypes.STRING,
    required: true
  },
  artist_ownership: {
    type: db.DataTypes.STRING
  },
  artist_role: {
    type: db.DataTypes.STRING 
  },
  agreement: {
    type: db.DataTypes.STRING
  },
  legal: {
    type: db.DataTypes.BOOLEAN,
    defaultValue: 0
  },
  track_display_name: {
    type: db.DataTypes.STRING
  },
  track_url: {
    type: db.DataTypes.STRING
  },
  track_discription: {
    type: db.DataTypes.TEXT
  },
  iscr: {
    type: db.DataTypes.STRING
  },
  monetise: {
    type: db.DataTypes.BOOLEAN,
    defaultValue: 0
  },
  list_on_profile: {
    type: db.DataTypes.BOOLEAN,
    defaultValue: 0
  },
  vibes: {
    type: db.DataTypes.TEXT
  },
  tags: {
    type: db.DataTypes.TEXT
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: 0
  },
  createdAt: db.DataTypes.DATE,
  updatedAt: db.DataTypes.DATE,
}, { underscored: true, tableName: 'tracks' });

module.exports = tracks;
