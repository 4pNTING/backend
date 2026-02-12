import { DynamicModule, Module } from '@nestjs/common';

import { DatabaseZoneRepository } from '../repositories/zone/zone.repository';
import { RepositoriesModule } from '../repositories/repositories.module';

import { CreateZoneUsecase } from '../../usecases/zone/createZone.usecase';
import { UpdateZoneUsecase } from '../../usecases/zone/updateZone.usecase';
import { DeleteZoneUsecase } from '../../usecases/zone/deleteZone.usecase';
import { LoadAllZoneUsecase } from '../../usecases/zone/loadAllZone.usecase';
import { LoadZoneByIdUsecase } from '../../usecases/zone/loadZoneById.usecase';
import { RestoreZoneUsecase } from '../../usecases/zone/restoreZone.usecase';

@Module({
    imports: [RepositoriesModule],
})
export class ZoneUsecasesProxyModule {
    static CREATE_ZONE_PROXY = 'CreateZoneProxy';
    static UPDATE_ZONE_PROXY = 'UpdateZoneProxy';
    static DELETE_ZONE_PROXY = 'DeleteZoneProxy';
    static LOAD_ALL_ZONE_PROXY = 'LoadAllZoneProxy';
    static LOAD_BY_ID_ZONE_PROXY = 'LoadByIdZoneProxy';
    static RESTORE_ZONE_PROXY = 'RestoreZoneProxy';

    static register(): DynamicModule {
        return {
            module: ZoneUsecasesProxyModule,
            providers: [
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.CREATE_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new CreateZoneUsecase(repo),
                },
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.UPDATE_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new UpdateZoneUsecase(repo),
                },
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.DELETE_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new DeleteZoneUsecase(repo),
                },
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.LOAD_ALL_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new LoadAllZoneUsecase(repo),
                },
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.LOAD_BY_ID_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new LoadZoneByIdUsecase(repo),
                },
                {
                    inject: [DatabaseZoneRepository],
                    provide: ZoneUsecasesProxyModule.RESTORE_ZONE_PROXY,
                    useFactory: (repo: DatabaseZoneRepository) => new RestoreZoneUsecase(repo),
                },
            ],
            exports: [
                ZoneUsecasesProxyModule.CREATE_ZONE_PROXY,
                ZoneUsecasesProxyModule.UPDATE_ZONE_PROXY,
                ZoneUsecasesProxyModule.DELETE_ZONE_PROXY,
                ZoneUsecasesProxyModule.LOAD_ALL_ZONE_PROXY,
                ZoneUsecasesProxyModule.LOAD_BY_ID_ZONE_PROXY,
                ZoneUsecasesProxyModule.RESTORE_ZONE_PROXY,
            ],
        };
    }
}
