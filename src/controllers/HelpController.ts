import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Help from '../models/Help';
import { Status } from '../models/Status';

function isStatusInvalid(status: string){
  return status !== Status.aguardando && status !== Status.finalizado;
}

const ERROR_MSGS = {
  INVALID_STATUS_MSG: { error: 'invalid status format, it must be either "aguardando" or "finalizado"' },
  HELP_NOT_FOUND: { error: 'Help entity not found' },
}

export default {

  async index(request: Request, response: Response) {
    const helpRepository = getRepository(Help);

    const helps = await helpRepository.find();

    return response.json(helps);
  },

  async show(request: Request, response: Response) {
    const helpRepository = getRepository(Help);
    const { id } = request.params;

    const help: Help = await helpRepository.findOneOrFail(id);

    return response.json(help);
  },

  async create(request: Request, response: Response) {
    const helpRepository = getRepository(Help);
    const {
      nome,
      latitude,
      longitude,
      mensagem,
      telefone,
      email,
      idade,
    } = request.body;

    const dataCriacao = new Date();
    const status = Status.aguardando;

    const help = helpRepository.create({
      nome, latitude, longitude, mensagem, dataCriacao, status, telefone, email, idade
    });

    await helpRepository.save(help);

    return response.status(201).json(help);
  },

  async delete(request: Request, response: Response) {
    const helpRepository = getRepository(Help);
    const { id } = request.params;

    const help: Help = await helpRepository.findOneOrFail(id);

    if(!help){
      return response.status(404).json(ERROR_MSGS.HELP_NOT_FOUND)
    }

    await helpRepository.delete(id);

    return response.json({ message: 'Help deleted successfully' });
  },

  async update(request: Request, response: Response) {
    const helpRepository = getRepository(Help);
    const {
      nome,
      latitude,
      longitude,
      mensagem,
      status,
      telefone,
      email,
      idade,
    } = request.body;

    if( isStatusInvalid(status) ) {
      return response.status(400).json(ERROR_MSGS.INVALID_STATUS_MSG);
    }

    const id = Number(request.params.id);
    const dataCriacao = new Date();

    const updatedHelp: Help = {
      id, nome, latitude, longitude, mensagem, dataCriacao, status, telefone, email, idade
    };

    await helpRepository.save(updatedHelp);

    return response.json(updatedHelp);
  },

  async changeStatus(request: Request, response: Response) {
    const helpRepository = getRepository(Help);

    const id = Number(request.params.id);

    const status = request.body.status;
    if( isStatusInvalid(status) ) {
      return response.status(400).json(ERROR_MSGS.INVALID_STATUS_MSG);
    }

    const updatedHelp = { id, status }
    await helpRepository.save(updatedHelp);

    return response.json(updatedHelp);
  }
};