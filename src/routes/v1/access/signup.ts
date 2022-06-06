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
import jwt from 'jsonwebtoken';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { sendEmail } from '../../../email/sendEmail';

const router = express.Router();
const tokenKey: any = process.env.TOKEN;

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (user) throw new BadRequestError('User already registered');
    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const { user: createdUser } = await UserRepo.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      } as UserModel,
      accessTokenKey,
      refreshTokenKey,
      req.body.roleId,
    );
    const tokenGenerator = jwt.sign(createdUser.userId, tokenKey);
    sendEmail(req.body.email, tokenGenerator);
    new SuccessResponse('Signup Successful', {
      user: createdUser,
      tokens: tokenGenerator,
    }).send(res);
  }),
);

export default router;
