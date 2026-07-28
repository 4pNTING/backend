import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import {
  Attachment,
  LoadAttachmentResponse,
  LoadAttachmentByIdResponse,
  CreateAttachmentDto,
  UpdateAttachmentDto,
  LoadAttachmentDto,
  LoadAttachmentByIdDto,
  DeleteAttachmentDto,
  RestoreAttachmentDto,
  CreateAttachmentResponse,
  UpdateAttachmentResponse,
  DeleteAttachmentResponse,
  RestoreAttachmentResponse,
} from './attachment.model';
import { AttachmentUsecasesProxyModule } from '../../usecases-proxy/attachment-usecases-proxy.module';
import { CreateAttachmentUseCase } from '../../../usecases/attachment/createAttachment.usecase';
import { UpdateAttachmentUseCase } from '../../../usecases/attachment/updateAttachment.usecase';
import { DeleteAttachmentUseCase } from '../../../usecases/attachment/deleteAttachment.usecase';
import { LoadAttachmentUseCase } from '../../../usecases/attachment/loadAllAttachment.usecase';
import { LoadByIDAttachmentUseCase } from '../../../usecases/attachment/loadAttachmentById.usecase';
import { RestoreAttachmentUseCase } from '../../../usecases/attachment/restoreAttachment.usecase';

@Resolver(() => Attachment)
@UseGuards(JwtAuthGuard)
export class AttachmentResolver {
  private readonly logger = new Logger(AttachmentResolver.name);

  constructor(
    @Inject(AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY)
    private readonly createAttachmentUseCase: CreateAttachmentUseCase,

    @Inject(AttachmentUsecasesProxyModule.UPDATE_ATTACHMENT_PROXY)
    private readonly updateAttachmentUseCase: UpdateAttachmentUseCase,

    @Inject(AttachmentUsecasesProxyModule.DELETE_ATTACHMENT_PROXY)
    private readonly deleteAttachmentUseCase: DeleteAttachmentUseCase,

    @Inject(AttachmentUsecasesProxyModule.LOAD_ATTACHMENT_PROXY)
    private readonly loadAttachmentUseCase: LoadAttachmentUseCase,

    @Inject(AttachmentUsecasesProxyModule.LOAD_BY_ID_ATTACHMENT_PROXY)
    private readonly loadAttachmentByIdUseCase: LoadByIDAttachmentUseCase,

    @Inject(AttachmentUsecasesProxyModule.RESTORE_ATTACHMENT_PROXY)
    private readonly restoreAttachmentUseCase: RestoreAttachmentUseCase,
  ) {}

  // ==============================
  // QUERY
  // ==============================

  @Query(() => LoadAttachmentResponse, { name: 'loadAttachment' })
  async loadAttachment(
    @Args('input', { nullable: true }) input: LoadAttachmentDto,
  ) {
    const query: any = {};

    if (input) {
      if (input.page || input.limit) {
        query.paginate = {
          page: input.page,
          limit: input.limit,
        };
      }
      if (input.keyword) {
        query.search = { q: input.keyword };
      }
      if (input.isActive) {
        query.isActive = input.isActive;
      }
      if (input.sortField) {
        query.sortField = input.sortField;
      }
      if (input.sortDirection) {
        query.sortDirection = input.sortDirection;
      }
    }

    const result = await this.loadAttachmentUseCase.execute(query);
    return {
      attachment: result.items,
      count: result.total,
    };
  }

  @Query(() => LoadAttachmentByIdResponse, { name: 'loadAttachmentById', nullable: true })
  async loadAttachmentById(
    @Args('input') input: LoadAttachmentByIdDto,
  ) {
    const result = await this.loadAttachmentByIdUseCase.execute({ _id: input._id });
    if (!result) return { attachment: null };
    return { attachment: result };
  }

  // ==============================
  // MUTATION
  // ==============================

  @Mutation(() => CreateAttachmentResponse)
  async createAttachment(
    @Args('input') input: CreateAttachmentDto,
  ) {
    const result = await this.createAttachmentUseCase.execute(input);
    return { attachment: result };
  }

  @Mutation(() => UpdateAttachmentResponse)
  async updateAttachment(
    @Args('input') input: UpdateAttachmentDto,
  ) {
    await this.updateAttachmentUseCase.execute(input);
    const updated = await this.loadAttachmentByIdUseCase.execute({ _id: input._id });
    return { attachment: updated };
  }

  @Mutation(() => DeleteAttachmentResponse)
  async deleteAttachment(
    @Args('input') input: DeleteAttachmentDto,
  ) {
    await this.deleteAttachmentUseCase.execute(input);
    return { attachment: { _id: input._id } };
  }

  @Mutation(() => RestoreAttachmentResponse)
  async restoreAttachment(
    @Args('input') input: RestoreAttachmentDto,
  ) {
    const result = await this.restoreAttachmentUseCase.execute(input._id);
    return { attachment: result };
  }
}
