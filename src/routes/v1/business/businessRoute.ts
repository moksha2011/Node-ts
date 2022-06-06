import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import BusinessRepo from '../../../database/repository/BusinessRepo';
import asyncHandler from '../../../helpers/asyncHandler';
import { BusinessModel } from '../../../database/model/Business';
import { Req } from '@nestjs/common';
import { BadRequestError } from '../../../core/ApiError';

const router = express.Router();
router.get(
  '/businessid/:id',
  validator(schema.businessInput, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const businesses = await BusinessRepo.findbyid({
      name: new req.body.name(),
    });
    return new SuccessResponse('success', businesses).send(res);
  }),
);

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const allbusiness = await BusinessModel.findAll({ where: {} });
    return new SuccessResponse(req.body, allbusiness).send(res);
  }),
);

router.post(
  '/businessCreate',
  validator(schema.businessInput),
  asyncHandler(async (req, res) => {
    const { business: businesscreate } = await BusinessRepo.create({
      businessName: req.body.businessName,
      businessDescription: req.body.businessDescription,
    } as BusinessModel);
    new SuccessResponse(' business Created', { business: businesscreate }).send(res);
  }),
);

router.put(
  '/businessupdate/:name',
  validator(schema.businessInput, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const businessupdate = await BusinessRepo.findByName(req.params.name);
    console.log(businessupdate);
    // if (!businessupdate) throw new BadRequestError(req.body);
    const updatebusiness = await BusinessRepo.update(
      req.body.name,
      req.body.description,
      req.body.id,
    );
    const updatebusiness1 = await BusinessRepo.findByName(req.body.name);
    return new SuccessResponse(req.body, updatebusiness1).send(res);
  }),
);

export default router;

// function as(
//   arg0: { businessName: any; businessDescription: any },
//   as: any,
//   BusinessModel: typeof BusinessModel,
//   arg3: express.Response<any, Record<string, any>>,
// ): { business: any } | PromiseLike<{ business: any }> {
//   throw new Error('Function not implemented.');
// }
// function as(arg0: { businessName: any; businessDescription: any; }, as: any, BusinessModel: typeof BusinessModel): { business: any; } | PromiseLike<{ business: any; }> {
//   throw new Error('Function not implemented.');
// }
