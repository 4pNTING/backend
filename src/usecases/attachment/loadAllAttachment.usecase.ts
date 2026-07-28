import { Injectable } from '@nestjs/common';
import { DatabaseAttachmentRepository } from '../../infrastructure/repositories/attachment/attachment.repository';
import { LoadAllAttachmentResponse } from '../../domain/models/attachment.model';
import { QueryProps } from '../../domain/models/query.model';

@Injectable()
export class LoadAttachmentUseCase {
  constructor(private readonly attachmentRepository: DatabaseAttachmentRepository) {}

  async execute(query: QueryProps): Promise<LoadAllAttachmentResponse> {
    return await this.attachmentRepository.findAll(query);
  }
}
