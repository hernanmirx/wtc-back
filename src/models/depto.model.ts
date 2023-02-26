import {Entity, model, property} from '@loopback/repository';

@model()
export class Depto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Depto>) {
    super(data);
  }
}

export interface DeptoRelations {
  // describe navigational properties here
}

export type DeptoWithRelations = Depto & DeptoRelations;
