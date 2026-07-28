import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { DeleteAttachmentRequest } from '../../domain/models/attachment.model';

@Injectable()
export class DeleteAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(params: DeleteAttachmentRequest): Promise<void> {
    await this.attachmentRepository.delete(params);
  }
}
