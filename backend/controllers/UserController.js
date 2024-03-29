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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authMe = exports.loginUser = exports.register = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var PostController_1 = require("./PostController");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, login, password, foundedUser, docPost, user, token, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, PostController_1.customValidationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array()[0].error })];
                }
                _a = req.body, login = _a.login, password = _a.password;
                return [4 /*yield*/, User_1["default"].findOne({ login: login })];
            case 1:
                foundedUser = _b.sent();
                if (foundedUser) {
                    return [2 /*return*/, res.status(400).json({ error: 'Данный логин уже существует.' })];
                }
                docPost = new User_1["default"]({ login: login, password: password });
                return [4 /*yield*/, docPost.save()];
            case 2:
                user = _b.sent();
                token = jsonwebtoken_1["default"].sign({
                    login: user.login
                }, process.env.SALT, {
                    expiresIn: '15d'
                });
                res.status(200).json({ login: user.login, token: token });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, login, password, foundedUser, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, PostController_1.customValidationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array()[0].error })];
                }
                _a = req.body, login = _a.login, password = _a.password;
                return [4 /*yield*/, User_1["default"].findOne({ login: login, password: password })];
            case 1:
                foundedUser = _b.sent();
                if (!foundedUser) {
                    return [2 /*return*/, res.status(400).json({ error: 'Неверный логин или пароль' })];
                }
                token = jsonwebtoken_1["default"].sign({
                    login: foundedUser.login
                }, process.env.SALT, {
                    expiresIn: '15d'
                });
                res.status(200).json({ login: foundedUser.login, token: token });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var authMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, owner, user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
                if (!token) return [3 /*break*/, 2];
                decoded = jsonwebtoken_1["default"].verify(token, process.env.SALT);
                owner = decoded.login;
                return [4 /*yield*/, User_1["default"].findOne({ login: owner })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(200).json({ login: null })];
                }
                res.status(200).json({ login: user.login });
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, res.status(200).json({ login: null })];
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.authMe = authMe;
