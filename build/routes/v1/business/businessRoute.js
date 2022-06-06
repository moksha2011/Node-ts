"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const validator_1 = __importStar(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const BusinessRepo_1 = __importDefault(require("../../../database/repository/BusinessRepo"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const Business_1 = require("../../../database/model/Business");
const router = express_1.default.Router();
router.get('/businessid/:id', (0, validator_1.default)(schema_1.default.businessInput, validator_1.ValidationSource.PARAM), (0, asyncHandler_1.default)(async (req, res) => {
    const businesses = await BusinessRepo_1.default.findbyid({
        name: new req.body.name(),
    });
    return new ApiResponse_1.SuccessResponse('success', businesses).send(res);
}));
router.get('/all', (0, asyncHandler_1.default)(async (req, res) => {
    const allbusiness = await Business_1.BusinessModel.findAll({ where: {} });
    return new ApiResponse_1.SuccessResponse(req.body, allbusiness).send(res);
}));
router.post('/businessCreate', (0, validator_1.default)(schema_1.default.businessInput), (0, asyncHandler_1.default)(async (req, res) => {
    const { business: businesscreate } = await BusinessRepo_1.default.create({
        businessName: req.body.businessName,
        businessDescription: req.body.businessDescription,
    });
    new ApiResponse_1.SuccessResponse(' business Created', { business: businesscreate }).send(res);
}));
router.put('/businessupdate/:name', (0, validator_1.default)(schema_1.default.businessInput, validator_1.ValidationSource.PARAM), (0, asyncHandler_1.default)(async (req, res) => {
    const businessupdate = await BusinessRepo_1.default.findByName(req.params.name);
    console.log(businessupdate);
    // if (!businessupdate) throw new BadRequestError(req.body);
    const updatebusiness = await BusinessRepo_1.default.update(req.body.name, req.body.description, req.body.id);
    const updatebusiness1 = await BusinessRepo_1.default.findByName(req.body.name);
    return new ApiResponse_1.SuccessResponse(req.body, updatebusiness1).send(res);
}));
exports.default = router;
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
//# sourceMappingURL=businessRoute.js.map