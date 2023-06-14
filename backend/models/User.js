"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    login: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});
exports["default"] = (0, mongoose_1.model)('User', UserSchema);
