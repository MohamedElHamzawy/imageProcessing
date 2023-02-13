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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const queryValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        if (name === '' ||
            name == undefined ||
            Number.isNaN(height) ||
            height <= 0 ||
            Number.isNaN(width) ||
            width <= 0) {
            res.status(400).json({
                Error: `Sorry it seems you forgot to declare query strings correcctly, 
        make sure that you added name,height and width in the url with same spelling as mentioned. 
        Make sure that width and height are positive integers.`,
            });
        }
        else {
            fs_1.promises.open(path_1.default.resolve(`./original/${name}.jpg`))
                .then(() => {
                next();
            })
                .catch(() => {
                res.status(400).json({
                    Error: `Image ${name} not found. Make sure you wrote image name correctly and notice that only .jpg images are allowed`,
                });
            });
        }
    }
    catch (error) {
        res.status(500).json({ ServerError: error });
    }
});
const existValidation = (req, res, next) => {
    try {
        const name = req.query.name;
        const height = parseInt(req.query.height);
        const width = parseInt(req.query.width);
        fs_1.promises.open(path_1.default.resolve(`./resized/${name}-${width}-${height}.png`))
            .then(() => {
            res
                .status(200)
                .sendFile(path_1.default.resolve(`./resized/${name}-${width}-${height}.png`));
        })
            .catch(() => {
            next();
        });
    }
    catch (error) {
        res.status(500).json({ ServerError: error });
    }
};
exports.default = { queryValidation, existValidation };
