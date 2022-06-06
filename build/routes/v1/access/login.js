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
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.default = router.post('/basic', (0, validator_1.default)(schema_1.default.userCredential), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    if (!user.password)
        throw new ApiError_1.BadRequestError('Credential not set');
    const match = await bcrypt_1.default.compare(req.body.password, user.password);
    if (!match)
        throw new ApiError_1.AuthFailureError('Authentication failure');
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    // const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    new ApiResponse_1.SuccessResponse('Login Success', {
        user: user,
        tokens: accessTokenKey,
    }).send(res);
}));
//# sourceMappingURL=login.js.map