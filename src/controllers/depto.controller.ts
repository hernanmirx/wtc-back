import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Depto} from '../models';
import {DeptoRepository} from '../repositories';

export class DeptoController {
  constructor(
    @repository(DeptoRepository)
    public deptoRepository : DeptoRepository,
  ) {}

  @post('/deptos')
  @response(200, {
    description: 'Depto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Depto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Depto, {
            title: 'NewDepto',
            
          }),
        },
      },
    })
    depto: Depto,
  ): Promise<Depto> {
    return this.deptoRepository.create(depto);
  }

  @get('/deptos/count')
  @response(200, {
    description: 'Depto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Depto) where?: Where<Depto>,
  ): Promise<Count> {
    return this.deptoRepository.count(where);
  }

  @get('/deptos')
  @response(200, {
    description: 'Array of Depto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Depto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Depto) filter?: Filter<Depto>,
  ): Promise<Depto[]> {
    return this.deptoRepository.find(filter);
  }

  @patch('/deptos')
  @response(200, {
    description: 'Depto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Depto, {partial: true}),
        },
      },
    })
    depto: Depto,
    @param.where(Depto) where?: Where<Depto>,
  ): Promise<Count> {
    return this.deptoRepository.updateAll(depto, where);
  }

  @get('/deptos/{id}')
  @response(200, {
    description: 'Depto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Depto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Depto, {exclude: 'where'}) filter?: FilterExcludingWhere<Depto>
  ): Promise<Depto> {
    return this.deptoRepository.findById(id, filter);
  }

  @patch('/deptos/{id}')
  @response(204, {
    description: 'Depto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Depto, {partial: true}),
        },
      },
    })
    depto: Depto,
  ): Promise<void> {
    await this.deptoRepository.updateById(id, depto);
  }

  @put('/deptos/{id}')
  @response(204, {
    description: 'Depto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() depto: Depto,
  ): Promise<void> {
    await this.deptoRepository.replaceById(id, depto);
  }

  @del('/deptos/{id}')
  @response(204, {
    description: 'Depto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deptoRepository.deleteById(id);
  }
}
