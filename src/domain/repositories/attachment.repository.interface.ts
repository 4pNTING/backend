import { QueryProps } from '../models/query.model';
import {
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  UpdateAttachmentRequest,
  DeleteAttachmentRequest,
  LoadAllAttachmentResponse,
  LoadAttachmentByIdRequest,
  LoadAttachmentByIdResponse,
  AttachmentModel
} from '../models/attachment.model';

export interface IAttachmentRepository {
  create(params: CreateAttachmentRequest): Promise<CreateAttachmentResponse>;
  update(params: UpdateAttachmentRequest): Promise<void>;
  delete(params: DeleteAttachmentRequest): Promise<void>;
  restore(_id: string): Promise<void>;
  findAll(query: QueryProps): Promise<LoadAllAttachmentResponse>;
  findById(params: LoadAttachmentByIdRequest): Promise<LoadAttachmentByIdResponse | null>;
  findByOwner(ownerId: string, ownerType?: string): Promise<AttachmentModel[]>;
}
