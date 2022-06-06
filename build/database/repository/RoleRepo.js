"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../model/Role");
class RoleRepo {
    static findByCode(code) {
        return Role_1.RoleModel.findOne({ where: { roleCode: code } });
    }
}
exports.default = RoleRepo;
//# sourceMappingURL=RoleRepo.js.map