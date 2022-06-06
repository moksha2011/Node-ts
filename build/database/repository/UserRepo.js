"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const Role_1 = require("../model/Role");
const ApiError_1 = require("../../core/ApiError");
// import KeystoreRepo from './KeystoreRepo';
// import Keystore from '../model/Keystore';
class UserRepo {
    // contains critical information of the user
    static findById(id) {
        return User_1.UserModel.findOne({ where: { userId: id, status: true } });
    }
    static findByEmail(email) {
        return User_1.UserModel.findOne({ where: { email: email, status: true } });
    }
    static findProfileById(id) {
        return User_1.UserModel.findOne({ where: { userId: id, status: true } });
    }
    static findPublicProfileById(id) {
        return User_1.UserModel.findOne({ where: { userId: id, status: true } });
    }
    // public static findByEmailforId(email: string):Promise<UserModel | null>  {
    //   const data= UserModel.findOne({ where:{email: email }})
    //   return
    // }
    static async create(user, accessTokenKey, refreshTokenKey, roleId) {
        const now = new Date();
        const role = await Role_1.RoleModel.findOne({ where: { roleId: roleId } });
        // .select('+email +password')
        // .lean<Role>()
        // .exec();
        if (!role)
            throw new ApiError_1.InternalError('Role must be defined');
        user.roleId = role.roleId;
        user.createdAt = user.updatedAt = now;
        const createdUser = await User_1.UserModel.create(user);
        // const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
        return { user: createdUser };
    }
}
exports.default = UserRepo;
//# sourceMappingURL=UserRepo.js.map