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
exports.deletePost = exports.findPosts = exports.getPost = exports.getRandomPost = exports.updatePost = exports.getAllPosts = exports.createPost = exports.customValidationResult = void 0;
var fs_1 = __importDefault(require("fs"));
var express_validator_1 = require("express-validator");
var Post_1 = __importDefault(require("../models/Post"));
exports.customValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: function (error) {
        return { error: error.msg };
    }
});
var notFoundPost = JSON.parse(fs_1["default"].readFileSync(__dirname + '/notFound.json', 'utf8'));
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, markdown, tags, menu, title, owner, link, docPost, post, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, exports.customValidationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array()[0].error })];
                }
                _a = req.body, markdown = _a.markdown, tags = _a.tags, menu = _a.menu, title = _a.title, owner = _a.owner;
                console.log(markdown, tags, menu, title, owner);
                link = title.replaceAll(/[^a-zA-Z0-9 А-Яа-я]/g, '').replaceAll(' ', '-') + Date.now();
                docPost = new Post_1["default"]({ link: link, title: title, menu: menu, tags: tags, markdown: markdown, owner: owner });
                return [4 /*yield*/, docPost.save()];
            case 1:
                post = _b.sent();
                res.status(200).json({ link: post.link });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log(e_1);
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var getAllPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1["default"].find()];
            case 1:
                posts = _a.sent();
                res.json({ posts: posts });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPosts = getAllPosts;
var updatePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, markdown, menu, link, owner, post, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, exports.customValidationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array()[0].error })];
                }
                _a = req.body, markdown = _a.markdown, menu = _a.menu, link = _a.link, owner = _a.owner;
                return [4 /*yield*/, Post_1["default"].findOne({ link: link })];
            case 1:
                post = _b.sent();
                if (post.owner !== owner) {
                    return [2 /*return*/, res.status(400).json({ error: 'У вас нет доступа.' })];
                }
                return [4 /*yield*/, Post_1["default"].updateOne({ link: link }, {
                        markdown: markdown,
                        menu: menu
                    })];
            case 2:
                _b.sent();
                res.status(200).json({ error: null });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_3) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
var getRandomPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, random, post, random2, nextPost, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Post_1["default"].count()];
            case 1:
                count = _a.sent();
                random = Math.floor(Math.random() * count);
                return [4 /*yield*/, Post_1["default"].findOne().skip(random)];
            case 2:
                post = _a.sent();
                random2 = Math.floor(Math.random() * (count - 1));
                return [4 /*yield*/, Post_1["default"].findOne({ link: { $ne: post.link } }).skip(random2)];
            case 3:
                nextPost = _a.sent();
                res.status(200).json({ post: post, nextPostInfo: { title: nextPost.title, link: nextPost.link } });
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_4) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getRandomPost = getRandomPost;
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, random, post_1, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.query.link) {
                    return [2 /*return*/, (0, exports.getRandomPost)(req, res)];
                }
                return [4 /*yield*/, Post_1["default"].count()];
            case 1:
                count = (_a.sent()) - 1;
                random = Math.floor(Math.random() * count);
                return [4 /*yield*/, Post_1["default"].findOne({ link: { $ne: req.query.link } }).skip(random)];
            case 2:
                post_1 = _a.sent();
                Post_1["default"].findOneAndUpdate({ link: req.query.link }, { $inc: { views: 1 } }, { returnDocument: 'after' }, function (e, doc) {
                    if (e) {
                        return res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e) });
                    }
                    res.json({ post: doc || notFoundPost, nextPostInfo: { title: post_1.title, link: post_1.link } });
                });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_5) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
var findPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var value, regexp, posts, foundedPosts, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                value = req.query.value;
                regexp = new RegExp(value.toString(), 'i');
                return [4 /*yield*/, Post_1["default"].find({ title: { $regex: regexp } }).limit(10)];
            case 1:
                posts = _a.sent();
                foundedPosts = posts.map(function (post) { return ({ title: post.title, link: post.link, owner: post.owner }); });
                res.status(200).json({ foundedPosts: foundedPosts });
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_6) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findPosts = findPosts;
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, link, owner, post, e_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                errors = (0, exports.customValidationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ error: errors.array()[0].error })];
                }
                _a = req.body, link = _a.link, owner = _a.owner;
                return [4 /*yield*/, Post_1["default"].findOne({ link: link })];
            case 1:
                post = _b.sent();
                if (post.owner !== owner) {
                    return [2 /*return*/, res.status(400).json({ error: 'У вас нет доступа.' })];
                }
                return [4 /*yield*/, Post_1["default"].deleteOne({ link: link })];
            case 2:
                _b.sent();
                res.status(200).json({ error: null });
                return [3 /*break*/, 4];
            case 3:
                e_7 = _b.sent();
                res.status(500).json({ error: 'Ошибка бекенда. Попробуйте позже', errorText: JSON.stringify(e_7) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
