/* eslint-disable @typescript-eslint/no-unused-vars */
import { BusinessModel } from '../model/Business';
// import KeystoreRepo from './KeystoreRepo';
// import Keystore from '../model/Keystore';

export default class BusinessRepo {
  static findByName(name: string) {
    throw new Error('Method not implemented.');
  }
  public static findbyid(id: any): Promise<BusinessModel | null> {
    return BusinessModel.findOne({ where: { businessId: id } });
  }

  public static async create(business: BusinessModel): Promise<{ business: BusinessModel }> {
    const now = new Date();
    business.createdAt = business.updatedAt = now;
    const businesscreate = await BusinessModel.create(business);
    // const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
    return { business: businesscreate };
  }

  public static update(businessName: any, businessId: any, businessDescription: any): Promise<any> {
    return BusinessModel.update(
      {
        businessName: businessName,
        businessDescription: businessDescription,
      },
      { where: { businessId: businessId } },
    );
  }
}
