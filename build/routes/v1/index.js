"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import apikey from '../../auth/apikey';
const signup_1 = __importDefault(require("./access/signup"));
const login_1 = __importDefault(require("./access/login"));
const logout_1 = __importDefault(require("./access/logout"));
const forgotpassword_1 = __importDefault(require("./access/forgotpassword"));
const businessRoute_1 = __importDefault(require("./business/businessRoute"));
// import token from './access/token';
// import blogList from './blog/blogList';
// import blogDetail from './blog/blogDetail';
// import writer from './blog/writer';
// import editor from './blog/editor';
// import user from './profile/user';
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/
router.use('/signup', signup_1.default);
router.use('/login', login_1.default);
router.use('/logout', logout_1.default);
router.use('/business', businessRoute_1.default);
router.use('/forgotpassword', forgotpassword_1.default);
// router.use('/token', token);
// router.use('/blogs', blogList);
// router.use('/blog', blogDetail);
// router.use('/writer/blog', writer);
// router.use('/editor/blog', editor);
// router.use('/profile', user);
exports.default = router;
//# sourceMappingURL=index.js.map