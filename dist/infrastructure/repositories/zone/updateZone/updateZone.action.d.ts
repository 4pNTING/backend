import { QueryRunner } from 'typeorm';
import { UpdateZoneRequest } from '../../../../domain/models/zone.model';
export declare class UpdateZoneAction {
    private readonly session;
    constructor(session: QueryRunner);
    execute(params: UpdateZoneRequest): Promise<void>;
}
