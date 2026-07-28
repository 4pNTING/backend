import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';

// UseCases
import { CreateAttachmentUseCase } from '../../usecases/attachment/createAttachment.usecase';
import { UpdateAttachmentUseCase } from '../../usecases/attachment/updateAttachment.usecase';
import { DeleteAttachmentUseCase } from '../../usecases/attachment/deleteAttachment.usecase';
import { LoadAttachmentUseCase } from '../../usecases/attachment/loadAllAttachment.usecase';
import { LoadByIDAttachmentUseCase } from '../../usecases/attachment/loadAttachmentById.usecase';
import { RestoreAttachmentUseCase } from '../../usecases/attachment/restoreAttachment.usecase';

@Module({
  imports: [RepositoriesModule],
})
export class AttachmentUsecasesProxyModule {
  static CREATE_ATTACHMENT_PROXY = 'CREATE_ATTACHMENT_PROXY';
  static UPDATE_ATTACHMENT_PROXY = 'UPDATE_ATTACHMENT_PROXY';
  static DELETE_ATTACHMENT_PROXY = 'DELETE_ATTACHMENT_PROXY';
  static LOAD_ATTACHMENT_PROXY = 'LOAD_ATTACHMENT_PROXY';
  static LOAD_BY_ID_ATTACHMENT_PROXY = 'LOAD_BY_ID_ATTACHMENT_PROXY';
  static RESTORE_ATTACHMENT_PROXY = 'RESTORE_ATTACHMENT_PROXY';

  static register(): DynamicModule {
    return {
      module: AttachmentUsecasesProxyModule,
      providers: [
        {
          provide: AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY,
          useClass: CreateAttachmentUseCase,
        },
        {
          provide: AttachmentUsecasesProxyModule.UPDATE_ATTACHMENT_PROXY,
          useClass: UpdateAttachmentUseCase,
        },
        {
          provide: AttachmentUsecasesProxyModule.DELETE_ATTACHMENT_PROXY,
          useClass: DeleteAttachmentUseCase,
        },
        {
          provide: AttachmentUsecasesProxyModule.LOAD_ATTACHMENT_PROXY,
          useClass: LoadAttachmentUseCase,
        },
        {
          provide: AttachmentUsecasesProxyModule.LOAD_BY_ID_ATTACHMENT_PROXY,
          useClass: LoadByIDAttachmentUseCase,
        },
        {
          provide: AttachmentUsecasesProxyModule.RESTORE_ATTACHMENT_PROXY,
          useClass: RestoreAttachmentUseCase,
        },
      ],
      exports: [
        AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY,
        AttachmentUsecasesProxyModule.UPDATE_ATTACHMENT_PROXY,
        AttachmentUsecasesProxyModule.DELETE_ATTACHMENT_PROXY,
        AttachmentUsecasesProxyModule.LOAD_ATTACHMENT_PROXY,
        AttachmentUsecasesProxyModule.LOAD_BY_ID_ATTACHMENT_PROXY,
        AttachmentUsecasesProxyModule.RESTORE_ATTACHMENT_PROXY,
      ],
    };
  }
}
