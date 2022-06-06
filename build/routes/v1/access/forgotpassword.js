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
const sendEmail_1 = require("../../../email/sendEmail");
const router = express_1.default.Router();
router.post('/basic', (0, validator_1.default)(schema_1.default.forgotPassword), (0, asyncHandler_1.default)(async (req, res) => {
    const emailData = req.body.email;
    const user = await UserRepo_1.default.findByEmail(emailData);
    if (!user)
        throw new ApiError_1.BadRequestError('User not exist');
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
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
    (0, sendEmail_1.sendEmail)(emailData, accessTokenKey);
    // const tokens = await createTokens(createdUser, accessTokenKey,refreshTokenKey );
    new ApiResponse_1.SuccessResponse('Link send in below email id', {
        user: emailData,
        tokens: accessTokenKey,
    }).send(res);
}));
router.get('/basic/confirm/:id', (0, asyncHandler_1.default)(async (req, res) => {
    // const user = await UserRepo.findProfileById(req.user._id);
    // if (!user) throw new BadRequestError('User not registered');
    return 'successful';
}));
exports.default = router;
//# sourceMappingURL=forgotpassword.js.map