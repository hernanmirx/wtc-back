import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Blog,
} from '../models';
import {UserRepository} from '../repositories';

export class UserBlogController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'Array of User has many Blog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Blog)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Blog>,
  ): Promise<Blog[]> {
    return this.userRepository.userBlogs(id).find(filter);
  }

  @post('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Blog)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {
            title: 'NewBlogInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) blog: Omit<Blog, 'id'>,
  ): Promise<Blog> {
    return this.userRepository.userBlogs(id).create(blog);
  }

  @patch('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'User.Blog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blog, {partial: true}),
        },
      },
    })
    blog: Partial<Blog>,
    @param.query.object('where', getWhereSchemaFor(Blog)) where?: Where<Blog>,
  ): Promise<Count> {
    return this.userRepository.userBlogs(id).patch(blog, where);
  }

  @del('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'User.Blog DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Blog)) where?: Where<Blog>,
  ): Promise<Count> {
    return this.userRepository.userBlogs(id).delete(where);
  }
}
