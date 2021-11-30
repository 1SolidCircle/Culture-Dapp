const config = { 
    //local
    // database: 'music_db',
    // username: 'root',
    // password: '',
    // host: 'localhost',
    // dialect: 'mysql',

    //dev
    database: 'music-db',
    username: 'admin',
    password: '$$$music$$$',
    host: 'music-db.cflzzysjrnu4.eu-west-2.rds.amazonaws.com',
    dialect: 'mysql',

    pool: {
        max: 10,
        min: 0,
        // acquire: 30000,
        idle: 10000,
    },
    privateKey: "$$$music$$$",  
    mailing: {
        service: 'gmail',
        username: 'write your gmail here',
        password: 'write your password here'
    },
};

module.exports = config;
