"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Help_1 = __importDefault(require("../models/Help"));
const Status_1 = require("../models/Status");
function isStatusInvalid(status) {
    return status !== Status_1.Status.aguardando && status !== Status_1.Status.finalizado;
}
const ERROR_MSGS = {
    INVALID_STATUS_MSG: { error: 'invalid status format, it must be either "aguardando" or "finalizado"' },
    HELP_NOT_FOUND: { error: 'Help entity not found' },
};
exports.default = {
    async index(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const helps = await helpRepository.find();
        return response.json(helps);
    },
    async show(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const { id } = request.params;
        const help = await helpRepository.findOneOrFail(id);
        return response.json(help);
    },
    async create(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const { nome, latitude, longitude, mensagem, telefone, email, idade, } = request.body;
        const dataCriacao = new Date();
        const status = Status_1.Status.aguardando;
        const help = helpRepository.create({
            nome, latitude, longitude, mensagem, dataCriacao, status, telefone, email, idade
        });
        await helpRepository.save(help);
        return response.status(201).json(help);
    },
    async delete(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const { id } = request.params;
        const help = await helpRepository.findOneOrFail(id);
        if (!help) {
            return response.status(404).json(ERROR_MSGS.HELP_NOT_FOUND);
        }
        await helpRepository.delete(id);
        return response.json({ message: 'Help deleted successfully' });
    },
    async update(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const { nome, latitude, longitude, mensagem, status, telefone, email, idade, } = request.body;
        if (isStatusInvalid(status)) {
            return response.status(400).json(ERROR_MSGS.INVALID_STATUS_MSG);
        }
        const id = Number(request.params.id);
        const dataCriacao = new Date();
        const updatedHelp = {
            id, nome, latitude, longitude, mensagem, dataCriacao, status, telefone, email, idade
        };
        await helpRepository.save(updatedHelp);
        return response.json(updatedHelp);
    },
    async changeStatus(request, response) {
        const helpRepository = typeorm_1.getRepository(Help_1.default);
        const id = Number(request.params.id);
        const status = request.body.status;
        if (isStatusInvalid(status)) {
            return response.status(400).json(ERROR_MSGS.INVALID_STATUS_MSG);
        }
        const updatedHelp = { id, status };
        await helpRepository.save(updatedHelp);
        return response.json(updatedHelp);
    }
};
