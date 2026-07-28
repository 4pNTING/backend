import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { LoadAttachmentByIdRequest, LoadAttachmentByIdResponse } from '../../domain/models/attachment.model';

@Injectable()
export class LoadByIDAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(params: LoadAttachmentByIdRequest): Promise<LoadAttachmentByIdResponse | null> {
    return await this.attachmentRepository.findById(params);
  }
}
