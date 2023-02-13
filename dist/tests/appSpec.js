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
const sharp_1 = __importDefault(require("sharp"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const api = (0, supertest_1.default)(app_1.default);
describe('Testing Endpoint To Be Ok', () => {
    it('tests resize endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/api/image/resize?name=fjord&width=600&height=600');
        expect(response.status).toBe(200);
    }));
    it('tests processing function', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield (0, sharp_1.default)(path_1.default.resolve(`./original/fjord.jpg`))
            .resize(100, 100)
            .png()
            .toFile(path_1.default.resolve(`./resized/fjord-${100}-${100}.png`));
        expect(file).toBeDefined();
    }));
});
describe('Testing File Existence', () => {
    it('tests if file exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield fs_1.promises.open(path_1.default.resolve('./original/fjord.jpg'));
        expect(file).toBeTruthy();
    }));
    it('tests that image processed', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield fs_1.promises.open(path_1.default.resolve('./resized/fjord-600-600.png'));
        expect(file).toBeTruthy();
    }));
});
