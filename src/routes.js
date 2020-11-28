"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HelpController_1 = __importDefault(require("./controllers/HelpController"));
const routes = express_1.Router();
routes.get('/', (request, response) => {
    return response.json({
        welcome_message: 'Stay Safe REST API: https://estacao-hack-2020.github.io/stay-safe'
    });
});
routes.get('/help', HelpController_1.default.index);
routes.get('/help/:id', HelpController_1.default.show);
routes.post('/help', HelpController_1.default.create);
routes.delete('/help/:id', HelpController_1.default.delete);
routes.put('/help/:id', HelpController_1.default.update);
routes.patch('/help/:id', HelpController_1.default.changeStatus);
exports.default = routes;
