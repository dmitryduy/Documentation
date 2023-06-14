"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    markdown: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    menu: [mongoose_1.Schema.Types.Mixed],
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        "default": Date.now
    },
    views: {
        type: Number,
        required: true,
        "default": 0
    },
    owner: {
        type: String,
        required: true
    }
});
exports["default"] = (0, mongoose_1.model)('Post', PostSchema);
