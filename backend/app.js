"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var creation_1 = require("./validations/creation");
var PostController_1 = require("./controllers/PostController");
var TagController_1 = require("./controllers/TagController");
var UserController_1 = require("./controllers/UserController");
var register_1 = require("./validations/register");
var login_1 = require("./validations/login");
var delete_1 = require("./validations/delete");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var server = http_1["default"].createServer(app);
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    origin: '*'
}));
app.use(express_1["default"].static(__dirname + '/assets'));
mongoose_1["default"].connect(process.env.DATABASE_URL)
    .then(function () { return console.log('db success'); })["catch"](console.log);
app.post('/create-post', creation_1.creationValidation, PostController_1.createPost);
app.put('/update-post', PostController_1.updatePost);
app.get('/posts', PostController_1.getAllPosts);
app.get('/post/', PostController_1.getPost);
app.get('/post-tags', TagController_1.getArticles);
app.post('/register', register_1.registerValidation, UserController_1.register);
app.post('/login', login_1.loginValidation, UserController_1.loginUser);
app.get('/find-post', PostController_1.findPosts);
app["delete"]('/delete-post', delete_1.deleteValidation, PostController_1.deletePost);
app.get('/auth/me', UserController_1.authMe);
server.listen(process.env.PORT || 5000, function () { return console.log('server start'); });
