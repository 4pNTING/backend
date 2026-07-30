import { CreateZoneRequest, UpdateZoneRequest } from '../../../domain/models/zone.model';
import { QueryProps } from '../../../domain/models/query.model';
import { CreateZoneUsecase } from '../../../usecases/zone/createZone.usecase';
import { UpdateZoneUsecase } from '../../../usecases/zone/updateZone.usecase';
import { DeleteZoneUsecase } from '../../../usecases/zone/deleteZone.usecase';
import { LoadAllZoneUsecase } from '../../../usecases/zone/loadAllZone.usecase';
import { LoadZoneByIdUsecase } from '../../../usecases/zone/loadZoneById.usecase';
import { RestoreZoneUsecase } from '../../../usecases/zone/restoreZone.usecase';
export declare class ZoneController {
    private readonly createZoneUseCase;
    private readonly updateZoneUseCase;
    private readonly deleteZoneUseCase;
    private readonly loadAllZoneUseCase;
    private readonly loadZoneByIdUseCase;
    private readonly restoreZoneUseCase;
    constructor(createZoneUseCase: CreateZoneUsecase, updateZoneUseCase: UpdateZoneUsecase, deleteZoneUseCase: DeleteZoneUsecase, loadAllZoneUseCase: LoadAllZoneUsecase, loadZoneByIdUseCase: LoadZoneByIdUsecase, restoreZoneUseCase: RestoreZoneUsecase);
    findAll(query: QueryProps): Promise<import("../../../domain/models/zone.model").LoadAllZoneResponse>;
    findOne(id: string): Promise<import("../../../domain/models/zone.model").LoadZoneByIdResponse>;
    create(body: CreateZoneRequest): Promise<import("../../../domain/models/zone.model").CreateZoneResponse>;
    update(id: string, body: Omit<UpdateZoneRequest, '_id'>): Promise<void>;
    delete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}
