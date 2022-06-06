"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const crypto_1 = __importDefault(require("crypto"));
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const ApiError_1 = require("../../../core/ApiError");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../../../email/sendEmail");
const router = express_1.default.Router();
const tokenKey = process.env.TOKEN;
router.post('/basic', (0, validator_1.default)(schema_1.default.signup), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (user)
        throw new ApiError_1.BadRequestError('User already registered');
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
    const { user: createdUser } = await UserRepo_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
    }, accessTokenKey, refreshTokenKey, req.body.roleId);
    const tokenGenerator = jsonwebtoken_1.default.sign(createdUser.userId, tokenKey);
    (0, sendEmail_1.sendEmail)(req.body.email, tokenGenerator);
    new ApiResponse_1.SuccessResponse('Signup Successful', {
        user: createdUser,
        tokens: tokenGenerator,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map