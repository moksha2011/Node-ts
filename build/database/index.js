"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbBusiness = exports.dbRole = exports.dbUser = exports.sequelize = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const Role_1 = __importDefault(require("./model/Role"));
const User_1 = __importDefault(require("./model/User"));
const Business_1 = __importDefault(require("./model/Business"));
exports.sequelize = new sequelize_1.Sequelize(`${config_1.db.name}`, `${config_1.db.user}`, `${config_1.db.password}`, {
    host: `${config_1.db.host}`,
    dialect: 'postgres',
});
exports.dbUser = {
    User: (0, User_1.default)(exports.sequelize),
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.dbRole = {
    Role: (0, Role_1.default)(exports.sequelize),
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.dbBusiness = {
    Business: (0, Business_1.default)(exports.sequelize),
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.sequelize
    .authenticate()
    .then(async () => {
    console.log('Connection has been established successfully.');
    await exports.dbRole.Role.sync();
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.sequelize
    .authenticate()
    .then(async () => {
    console.log('Connection has been established successfully.');
    await exports.dbUser.User.sync();
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.sequelize
    .authenticate()
    .then(async () => {
    console.log('Connection has been established successfully.');
    await exports.dbBusiness.Business.sync();
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=index.js.map