'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Admins", deps: []
 * createTable "Contests", deps: [Admins]
 * createTable "Participations", deps: [Contests]
 *
 **/

var info = {
    "revision": 1,
    "name": "migration2",
    "created": "2019-02-19T16:41:12.723Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Admins",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "admin_names": {
                    "type": Sequelize.STRING,
                    "field": "admin_names"
                },
                "admin_lastnames": {
                    "type": Sequelize.STRING,
                    "field": "admin_lastnames"
                },
                "admin_email": {
                    "type": Sequelize.STRING,
                    "field": "admin_email",
                    "unique": true
                },
                "admin_password": {
                    "type": Sequelize.STRING,
                    "field": "admin_password"
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
            "Contests",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "contest_name": {
                    "type": Sequelize.STRING,
                    "field": "contest_name"
                },
                "contest_banner": {
                    "type": Sequelize.STRING,
                    "field": "contest_banner"
                },
                "contest_url": {
                    "type": Sequelize.STRING,
                    "field": "contest_url",
                    "unique": true
                },
                "contest_begindate": {
                    "type": Sequelize.DATE,
                    "field": "contest_begindate"
                },
                "contest_enddate": {
                    "type": Sequelize.DATE,
                    "field": "contest_enddate"
                },
                "contest_prize": {
                    "type": Sequelize.DECIMAL,
                    "field": "contest_prize"
                },
                "contest_script": {
                    "type": Sequelize.TEXT,
                    "field": "contest_script"
                },
                "contest_guidelines": {
                    "type": Sequelize.TEXT,
                    "field": "contest_guidelines"
                },
                "contest_winner": {
                    "type": Sequelize.INTEGER,
                    "field": "contest_winner"
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
                "AdminId": {
                    "type": Sequelize.INTEGER,
                    "field": "AdminId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Admins",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Participations",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "participation_names": {
                    "type": Sequelize.STRING,
                    "field": "participation_names"
                },
                "participation_lastnames": {
                    "type": Sequelize.STRING,
                    "field": "participation_lastnames"
                },
                "participation_email": {
                    "type": Sequelize.STRING,
                    "field": "participation_email"
                },
                "participation_comments": {
                    "type": Sequelize.TEXT,
                    "field": "participation_comments"
                },
                "participation_date": {
                    "type": Sequelize.DATE,
                    "field": "participation_date"
                },
                "participation_originalroute": {
                    "type": Sequelize.STRING,
                    "field": "participation_originalroute"
                },
                "participation_route": {
                    "type": Sequelize.STRING,
                    "field": "participation_route",
                    "allowNull": true
                },
                "participation_status": {
                    "type": Sequelize.STRING,
                    "field": "participation_status"
                },
                "participation_queuetime": {
                    "type": Sequelize.DECIMAL,
                    "field": "participation_queuetime"
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
                "ContestId": {
                    "type": Sequelize.INTEGER,
                    "field": "ContestId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Contests",
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
