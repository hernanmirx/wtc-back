import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Role} from './role.model';
import {Depto} from './depto.model';
import {Blog} from './blog.model';

@model()
export class User extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @belongsTo(() => Role, {name: 'userRole'})
  roleId: string;

  @belongsTo(() => Depto, {name: 'userDepto'})
  deptoId: string;

  @hasMany(() => Blog)
  userBlogs: Blog[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
