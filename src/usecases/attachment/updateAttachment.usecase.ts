import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { UpdateAttachmentRequest } from '../../domain/models/attachment.model';

@Injectable()
export class UpdateAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(params: UpdateAttachmentRequest): Promise<void> {
    await this.attachmentRepository.update(params);
  }
}
