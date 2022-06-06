import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import { BadRequestError } from '../../../core/ApiError';
import User, { UserModel } from '../../../database/model/User';
import { createTokens } from '../../../auth/authUtils';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { sendEmail } from '../../../email/sendEmail';

const router = express.Router();
router.post(
  '/basic',
  validator(schema.forgotPassword),
  asyncHandler(async (req: RoleRequest, res) => {
    const emailData = req.body.email;
    const user = await UserRepo.findByEmail(emailData);
    if (!user) throw new BadRequestError('User not exist');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    // const passwordHash = await bcrypt.hash(req.body.password, 10);

    // const { user: createdUser} = await UserRepo.create(
    //   {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: passwordHash,

    //   } as UserModel,
    //   accessTokenKey,
    //   refreshTokenKey,
    //   req.body.roleId,
    // );
    sendEmail(emailData, accessTokenKey);
    // const tokens = await createTokens(createdUser, accessTokenKey,refreshTokenKey );
    new SuccessResponse('Link send in below email id', {
      user: emailData,
      tokens: accessTokenKey,
    }).send(res);
  }),
);
router.get(
  '/basic/confirm/:id',
  asyncHandler(async (req, res) => {
    // const user = await UserRepo.findProfileById(req.user._id);
    // if (!user) throw new BadRequestError('User not registered');
    return 'successful';
  }),
);

export default router;
