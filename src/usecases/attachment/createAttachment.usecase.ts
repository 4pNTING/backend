import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { AttachmentModel, CreateAttachmentRequest } from '../../domain/models/attachment.model';

@Injectable()
export class CreateAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(params: CreateAttachmentRequest): Promise<AttachmentModel> {
    return await this.attachmentRepository.create(params);
  }
}
