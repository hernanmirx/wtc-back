import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Depto,
} from '../models';
import {UserRepository} from '../repositories';

export class UserDeptoController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/depto', {
    responses: {
      '200': {
        description: 'Depto belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Depto)},
          },
        },
      },
    },
  })
  async getDepto(
    @param.path.string('id') id: typeof User.prototype.id,
  ): Promise<Depto> {
    return this.userRepository.userDepto(id);
  }
}
