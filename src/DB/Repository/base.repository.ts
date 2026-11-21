import {
  AnyBulkWriteOperation,
  AnyKeys,
  ClientSession,
  CreateOptions,
  DeleteResult,
  FlattenMaps,
  HydratedDocument,
  Model,
  MongooseBaseQueryOptions,
  MongooseBulkWriteOptions,
  MongooseUpdateQueryOptions,
  PopulateOptions,
  ProjectionType,
  Query,
  QueryFilter,
  QueryOptions,
  QueryWithHelpers,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';
import { AggregateOptions, PipelineStage } from 'mongoose';
import { IPagination } from '../../common/interface';
import { Injectable } from '@nestjs/common';
import mongodb, { CountOptions, UpdateOptions } from 'mongodb';
@Injectable()
export abstract class BaseRepository<TRawDocument> {
  constructor(protected readonly model: Model<TRawDocument>) {}
  async create({
    data,
  }: {
    data: AnyKeys<TRawDocument>;
  }): Promise<HydratedDocument<TRawDocument>>;
  async create({
    data,
    options,
  }: {
    data: AnyKeys<TRawDocument>[];
    options?: CreateOptions;
  }): Promise<HydratedDocument<TRawDocument>[]>;
  async create({
    data,
    options,
  }: {
    data: AnyKeys<TRawDocument>[] | AnyKeys<TRawDocument>;
    options?: CreateOptions;
  }): Promise<
    HydratedDocument<TRawDocument>[] | HydratedDocument<TRawDocument>
  > {
    return await this.model.create(data as any, options);
  }
  async createOne({
    data,
    options,
  }: {
    data: AnyKeys<TRawDocument>;
    options?: CreateOptions;
  }): Promise<HydratedDocument<TRawDocument>> {
    const [doc] = await this.model.create([data] as any, options);
    return doc as HydratedDocument<TRawDocument>;
  }
  async find({
    filter,
    projection,
    options,
  }: {
    filter?: QueryFilter<TRawDocument>;
    projection?: ProjectionType<TRawDocument>;
    options?: QueryOptions;
  }): Promise<HydratedDocument<TRawDocument>[]> {
    return await this.model.find(filter || {}, projection, options);
  }
  async findOne({
    filter,
    projection,
    options,
  }: {
    filter: QueryFilter<TRawDocument>;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument> & {
      lean?: false;
      populate?: PopulateOptions[];
    };
  }): Promise<HydratedDocument<TRawDocument> | null>;
  async findOne({
    filter,
    projection,
    options,
  }: {
    filter: QueryFilter<TRawDocument>;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument> & {
      lean?: true;
      populate?: PopulateOptions[];
    };
  }): Promise<FlattenMaps<TRawDocument> | null>;

  async findOne({
    filter,
    projection,
    options,
  }: {
    filter: QueryFilter<TRawDocument>;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument>;
  }): Promise<
    HydratedDocument<TRawDocument> | FlattenMaps<TRawDocument> | null
  > {
    const { lean, populate, ...queryOptions } = options ?? {};
    const doc = this.model.findOne(filter, projection, queryOptions);
    if (lean) {
      doc.lean(lean);
    }
    if (populate) {
      doc.populate(populate as PopulateOptions[]);
    }
    return await doc.exec();
  }
  async findById({
    _id,
    projection,
    options,
  }: {
    _id: Types.ObjectId;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument> & {
      lean?: false;
      populate?: PopulateOptions[] | string;
    };
  }): Promise<HydratedDocument<TRawDocument> | null>;
  async findById({
    _id,
    projection,
    options,
  }: {
    _id: Types.ObjectId;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument> & {
      lean?: true;
      populate?: PopulateOptions[] | string;
    };
  }): Promise<FlattenMaps<TRawDocument> | null>;
  async findById({
    _id,
    projection,
    options,
  }: {
    _id: Types.ObjectId;
    projection?: ProjectionType<TRawDocument> | null | undefined;
    options?: QueryOptions<TRawDocument>;
  }): Promise<
    HydratedDocument<TRawDocument> | FlattenMaps<TRawDocument> | null
  > {
    const doc = this.model.findById(_id, projection);
    if (options?.lean) {
      doc.lean();
    }
    if (options?.populate) {
      doc.populate(options.populate as PopulateOptions[]);
    }
    return await doc.exec();
  }
  async paginate({
    filter,
    projection,
    options = {},
    page = 1,
    limit = 5,
    sort,
  }: {
    filter?: QueryFilter<TRawDocument>;
    projection?: ProjectionType<TRawDocument>;
    options?: QueryOptions;
    page?: number;
    limit?: number;
    sort?: any;
  }): Promise<IPagination<TRawDocument>> {
    const numericPage =
      Number.isFinite(Number(page)) && Number(page) > 0
        ? Math.floor(Number(page))
        : 1;

    const numericLimit =
      Number.isFinite(Number(limit)) && Number(limit) > 0
        ? Math.floor(Number(limit))
        : 5;

    const skip = (numericPage - 1) * numericLimit;

    const queryOptions = {
      ...options,
      skip,
      limit: numericLimit,
      ...(sort !== undefined ? { sort } : {}),
    };

    const queryFilter = filter ?? {};

    const totalDocs = await this.model.countDocuments(queryFilter, {
      session: options.session ?? undefined,
    });

    const totalPages = Math.ceil(totalDocs / numericLimit);

    const docs = await this.model.find(queryFilter, projection, queryOptions);

    return {
      docs,
      pagination: {
        currentPage: numericPage,
        limit: numericLimit,
        totalDocs,
        totalPages,
        hasNextPage: numericPage < totalPages,
        hasPreviousPage: numericPage > 1,
      },
    };
  }

  async softDeleteChildren(parentId: Types.ObjectId, options?: UpdateOptions) {
    return this.model.updateMany(
      { parentId },
      { $set: { deletedAt: new Date() } },
      options
    );
  }
  async restoreChildren(parentId: Types.ObjectId, options?: UpdateOptions) {
    return await this.model.updateMany(
      { parentId },
      { $unset: { deletedAt: 1 } },
      options
    );
  }
  async HardDeleteChildren(
    parentId: Types.ObjectId,
    options?: mongodb.DeleteOptions & MongooseBaseQueryOptions<TRawDocument>
  ) {
    return await this.model.deleteMany({ parentId }, options);
  }
  async updateOne({
    filter = {},
    update,
    options,
  }: {
    filter: QueryFilter<HydratedDocument<TRawDocument>>;
    update: UpdateQuery<TRawDocument> | UpdateWithAggregationPipeline;
    options?: MongooseUpdateQueryOptions<TRawDocument> | null;
  }): Promise<UpdateWriteOpResult> {
    if (Array.isArray(update)) {
      const pipeline = [
        ...update,
        {
          $set: {
            __v: {
              $add: [{ $ifNull: ['$__v', 0] }, 1],
            },
          },
        },
      ];

      return await this.model.updateOne(filter, pipeline, {
        ...options,
        updatePipeline: true,
      });
    }

    const updateData = {
      ...update,
      $inc: {
        ...(update.$inc ?? {}),
        __v: 1,
      },
    };

    return await this.model.updateOne(filter, updateData, options);
  }
  async updateMany({
    filter = {},
    update,
    options = { returnDocument: 'after' },
  }: {
    filter: QueryFilter<TRawDocument>;
    update: UpdateQuery<TRawDocument> | UpdateWithAggregationPipeline;
    options?:
      | (MongooseUpdateQueryOptions<TRawDocument> & {
          returnDocument?: 'before' | 'after';
        } & { session?: ClientSession })
      | null;
  }): Promise<UpdateWriteOpResult> {
    if (Array.isArray(update)) {
      const pipeline = [
        ...update,
        {
          $set: {
            __v: {
              $add: [{ $ifNull: ['$__v', 0] }, 1],
            },
          },
        },
      ];

      return await this.model.updateMany(filter, pipeline, {
        ...options,
        updatePipeline: true,
      });
    }

    const updateData = {
      ...update,
      $inc: {
        ...(update.$inc ?? {}),
        __v: 1,
      },
    };

    return await this.model.updateMany(filter, updateData, options);
  }
  async findOneAndUpdate({
    filter = {},
    update,
    options = { returnDocument: 'after' },
  }: {
    filter: QueryFilter<TRawDocument>;
    update: UpdateQuery<TRawDocument>;
    options?: QueryOptions<TRawDocument> & {
      returnDocument?: 'before' | 'after';
    };
  }): Promise<HydratedDocument<TRawDocument> | null> {
    if (Array.isArray(update)) {
      return await this.model.findOneAndUpdate(filter, update, {
        ...options,
        updatePipeline: true,
      });
    }
    return await this.model.findOneAndUpdate(filter, update, options);
  }
  async findByIdAndUpdate({
    _id,
    update,
    options = { returnDocument: 'after' },
  }: {
    _id: Types.ObjectId;
    update: UpdateQuery<TRawDocument> | UpdateWithAggregationPipeline;
    options: QueryOptions<TRawDocument> & {
      returnDocument?: 'before' | 'after';
    };
  }): Promise<HydratedDocument<TRawDocument> | null> {
    if (Array.isArray(update)) {
      return await this.model.findByIdAndUpdate(_id, update, {
        ...options,
        updatePipeline: true,
      });
    }
    return await this.model.findByIdAndUpdate(_id, update, options);
  }
  async deleteOne({
    filter = {},
    options,
  }: {
    filter: QueryFilter<TRawDocument>;
    options?: mongodb.DeleteOptions & MongooseBaseQueryOptions<TRawDocument>;
  }): Promise<DeleteResult> {
    return await this.model.deleteOne(filter, options);
  }
  async deleteMany({
    filter = {},
    options = {},
  }: {
    filter: QueryFilter<TRawDocument>;
    options?:
      | ((mongodb.DeleteOptions & MongooseBaseQueryOptions<TRawDocument>) & {
          session?: ClientSession;
        })
      | null;
  }): Promise<DeleteResult> {
    return await this.model.deleteMany(filter, options);
  }
  async findOneAndDelete({
    filter = {},
    options,
  }: {
    filter: QueryFilter<TRawDocument>;
    options?: QueryOptions<TRawDocument>;
  }): Promise<HydratedDocument<TRawDocument> | null> {
    return await this.model.findOneAndDelete(filter, options);
  }
  async findByIdAndDelete({
    _id,
    options,
  }: {
    _id: Types.ObjectId;
    options?: QueryOptions<TRawDocument>;
  }): Promise<HydratedDocument<TRawDocument> | null> {
    return await this.model.findByIdAndDelete(_id, options);
  }
  async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions & { allowDeleted?: boolean }
  ) {
    return this.model.aggregate(pipeline, options);
  }

  async countDocuments({
    filter = {},
    options,
  }: {
    filter?: QueryFilter<TRawDocument>;
    options?: Omit<QueryOptions<TRawDocument>, 'session'> & {
      session?: mongodb.ClientSession;
    };
  }): Promise<number> {
    return this.model.countDocuments(filter, options).exec();
  }
  async bulkWrite<DocContents = TRawDocument>(
    writes: Array<
      AnyBulkWriteOperation<
        DocContents extends mongodb.Document ? DocContents : any
      >
    >,
    options: mongodb.BulkWriteOptions &
      MongooseBulkWriteOptions & { ordered: boolean }
  ): Promise<
    mongodb.BulkWriteResult & { mongoose?: { validationErrors: Error[] } }
  >;
  async bulkWrite<DocContents = TRawDocument>(
    writes: Array<
      AnyBulkWriteOperation<
        DocContents extends mongodb.Document ? DocContents : any
      >
    >,
    options?: mongodb.BulkWriteOptions & MongooseBulkWriteOptions
  ): Promise<mongodb.BulkWriteResult> {
    return await this.model.bulkWrite(writes, options);
  }
}
