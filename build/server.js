"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = __importDefault(require("./lib/Logger"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/logger', (_, res) => {
    Logger_1.default.error('This is an error log');
    Logger_1.default.warn('This is a warn log');
    Logger_1.default.info('This is a info log');
    Logger_1.default.http('This is a http log');
    Logger_1.default.debug('This is a debug log');
    res.send('Hello world');
});
app.listen(PORT, () => {
    Logger_1.default.error(`Server is up and running http://localhost:${PORT}`);
    Logger_1.default.warn('This is a warn log');
    Logger_1.default.info('This is a info log');
    Logger_1.default.http('This is a http log');
    Logger_1.default.debug('This is a debug log');
});
//# sourceMappingURL=server.js.map