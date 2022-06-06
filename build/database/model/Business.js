"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessModel = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const sequelize_1 = require("sequelize");
class BusinessModel extends sequelize_1.Model {
}
exports.BusinessModel = BusinessModel;
function default_1(sequelize) {
    BusinessModel.init({
        businessId: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
        },
        businessName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        businessDescription: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
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
        tableName: 'BusinessNode',
    });
    return BusinessModel;
}
exports.default = default_1;
//# sourceMappingURL=Business.js.map