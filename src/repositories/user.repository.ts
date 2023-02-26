import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, Role, Depto, Blog} from '../models';
import {RoleRepository} from './role.repository';
import {DeptoRepository} from './depto.repository';
import {BlogRepository} from './blog.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userRole: BelongsToAccessor<Role, typeof User.prototype.id>;

  public readonly userDepto: BelongsToAccessor<Depto, typeof User.prototype.id>;

  public readonly userBlogs: HasManyRepositoryFactory<Blog, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>, @repository.getter('DeptoRepository') protected deptoRepositoryGetter: Getter<DeptoRepository>, @repository.getter('BlogRepository') protected blogRepositoryGetter: Getter<BlogRepository>,
  ) {
    super(User, dataSource);
    this.userBlogs = this.createHasManyRepositoryFactoryFor('userBlogs', blogRepositoryGetter,);
    this.registerInclusionResolver('userBlogs', this.userBlogs.inclusionResolver);
    this.userDepto = this.createBelongsToAccessorFor('userDepto', deptoRepositoryGetter,);
    this.registerInclusionResolver('userDepto', this.userDepto.inclusionResolver);
    this.userRole = this.createBelongsToAccessorFor('userRole', roleRepositoryGetter,);
    this.registerInclusionResolver('userRole', this.userRole.inclusionResolver);
  }
}
