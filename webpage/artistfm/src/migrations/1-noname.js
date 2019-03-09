'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Artists", deps: []
 * createTable "Users", deps: []
 * createTable "Ratings", deps: [Artists, Users]
 * createTable "Songs", deps: [Artists]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-03-05T20:10:37.733Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Artists",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "artist_name": {
                    "type": Sequelize.STRING,
                    "field": "artist_name"
                },
                "artist_musicbrainz": {
                    "type": Sequelize.STRING,
                    "field": "artist_musicbrainz",
                    "unique": true
                },
                "artist_image": {
                    "type": Sequelize.STRING,
                    "field": "artist_image"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_names": {
                    "type": Sequelize.STRING,
                    "field": "user_names"
                },
                "user_lastnames": {
                    "type": Sequelize.STRING,
                    "field": "user_lastnames"
                },
                "user_email": {
                    "type": Sequelize.STRING,
                    "field": "user_email",
                    "unique": true
                },
                "user_password": {
                    "type": Sequelize.STRING,
                    "field": "user_password"
                },
                "user_image": {
                    "type": Sequelize.STRING,
                    "field": "user_image"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Ratings",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "rating_value": {
                    "type": Sequelize.FLOAT,
                    "field": "rating_value"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ArtistId": {
                    "type": Sequelize.INTEGER,
                    "field": "ArtistId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Artists",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Songs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "song_name": {
                    "type": Sequelize.STRING,
                    "field": "song_name"
                },
                "song_musicbrainz": {
                    "type": Sequelize.STRING,
                    "field": "song_musicbrainz",
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ArtistId": {
                    "type": Sequelize.INTEGER,
                    "field": "ArtistId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Artists",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
