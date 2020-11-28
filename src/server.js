"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./database/connection");
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
const port = process.env.PORT || 3333;
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://staysafe-api.herokuapp.com' : 'http://localhost';
app.listen(port, () => console.log(`💻  Server is running at ${baseUrl}:${port}/`));
