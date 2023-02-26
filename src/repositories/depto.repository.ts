import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Depto, DeptoRelations} from '../models';

export class DeptoRepository extends DefaultCrudRepository<
  Depto,
  typeof Depto.prototype.id,
  DeptoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Depto, dataSource);
  }
}
