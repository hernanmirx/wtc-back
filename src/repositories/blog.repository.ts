import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Blog, BlogRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class BlogRepository extends DefaultCrudRepository<
  Blog,
  typeof Blog.prototype.id,
  BlogRelations
> {

  public readonly blogUser: BelongsToAccessor<User, typeof Blog.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Blog, dataSource);
    this.blogUser = this.createBelongsToAccessorFor('blogUser', userRepositoryGetter,);
    this.registerInclusionResolver('blogUser', this.blogUser.inclusionResolver);
  }
}
