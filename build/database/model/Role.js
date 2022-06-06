"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
class RoleModel extends sequelize_1.Model {
}
exports.RoleModel = RoleModel;
function default_1(sequelize) {
    RoleModel.init({
        roleId: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
        },
        roleCode: {
            type: sequelize_1.DataTypes.ENUM("LEARNER" /* LEARNER */, "WRITER" /* WRITER */, "EDITOR" /* EDITOR */, "ADMIN" /* ADMIN */),
            allowNull: false,
            defaultValue: "LEARNER" /* LEARNER */,
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        tableName: 'RoleNode',
    });
    return RoleModel;
}
exports.default = default_1;
//# sourceMappingURL=Role.js.map