"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const resizeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        yield (0, sharp_1.default)(path_1.default.resolve(`./original/${name}.jpg`))
            .resize(width, height)
            .png()
            .toFile(path_1.default.resolve(`./resized/${name}-${width}-${height}.png`));
        res
            .status(200)
            .sendFile(path_1.default.resolve(`./resized/${name}-${width}-${height}.png`));
    }
    catch (error) {
        res.status(500).json({ ServerError: error });
    }
});
exports.default = resizeImage;
