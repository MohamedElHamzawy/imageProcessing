"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_controller_1 = __importDefault(require("./image.controller"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
router.get('/resize', middleware_1.default.queryValidation, middleware_1.default.existValidation, image_controller_1.default);
exports.default = router;
