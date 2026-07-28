import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { AttachmentModel } from '../../domain/models/attachment.model';

@Injectable()
export class RestoreAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(_id: string): Promise<AttachmentModel | null> {
    await this.attachmentRepository.restore(_id);
    return await this.attachmentRepository.findById({ _id });
  }
}
