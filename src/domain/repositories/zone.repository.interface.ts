import {
    CreateZoneRequest, CreateZoneResponse,
    UpdateZoneRequest,
    DeleteZoneRequest,
    LoadAllZoneResponse,
    LoadZoneByIdRequest, LoadZoneByIdResponse,
    RestoreZoneRequest
} from '../models/zone.model';
import { QueryProps } from '../models/query.model';

export interface IZoneRepository {
    create(params: CreateZoneRequest): Promise<CreateZoneResponse>;
    update(params: UpdateZoneRequest): Promise<void>;
    delete(params: DeleteZoneRequest): Promise<void>;
    restore(id: number): Promise<void>;
    findAll(query: QueryProps): Promise<LoadAllZoneResponse>;
    findById(params: LoadZoneByIdRequest): Promise<LoadZoneByIdResponse | null>;
}
