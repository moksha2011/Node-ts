/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTypes, Model, Optional, Sequelize, UUIDV4 } from 'sequelize';
import { RoleModel } from './Role';
import { UserModel } from './User';

export interface Business {
  businessId: string;
  businessName: string;
  businessDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BusinessCreationAttributes = Optional<Business, 'businessId'>;

export class BusinessModel extends Model<Business, BusinessCreationAttributes> implements Business {
  public businessId!: string;
  public businessName!: string;
  public businessDescription!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BusinessModel {
  BusinessModel.init(
    {
      businessId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      businessDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'BusinessNode',
    },
  );
  return BusinessModel;
}
