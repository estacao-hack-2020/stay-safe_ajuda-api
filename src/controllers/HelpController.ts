import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Help from '../models/Help';
import { Status } from '../models/Status';

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

    await helpRepository.delete(help);

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

    if( status !== Status.aguardando || status !== Status.finalizado ) {
      return response.status(400).json({ error: 'invalid status format'});
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

    let status: Status;
    try {
      status = request.body.status;
    } catch {
      return response.status(400).json({ error: 'invalid status format'});
    }

    const updatedHelp = { id, status }
    await helpRepository.save(updatedHelp);

    return response.json(updatedHelp);
  }

};