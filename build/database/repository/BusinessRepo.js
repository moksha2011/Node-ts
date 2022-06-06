"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const Business_1 = require("../model/Business");
// import KeystoreRepo from './KeystoreRepo';
// import Keystore from '../model/Keystore';
class BusinessRepo {
    static findByName(name) {
        throw new Error('Method not implemented.');
    }
    static findbyid(id) {
        return Business_1.BusinessModel.findOne({ where: { businessId: id } });
    }
    static async create(business) {
        const now = new Date();
        business.createdAt = business.updatedAt = now;
        const businesscreate = await Business_1.BusinessModel.create(business);
        // const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
        return { business: businesscreate };
    }
    static update(businessName, businessId, businessDescription) {
        return Business_1.BusinessModel.update({
            businessName: businessName,
            businessDescription: businessDescription,
        }, { where: { businessId: businessId } });
    }
}
exports.default = BusinessRepo;
//# sourceMappingURL=BusinessRepo.js.map