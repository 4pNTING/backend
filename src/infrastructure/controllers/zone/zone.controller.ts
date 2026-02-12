import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Inject,
    ParseIntPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
    CreateZoneRequest,
    UpdateZoneRequest,
    DeleteZoneRequest
} from '@domain/models/zone.model';
import { QueryProps } from '@domain/models/query.model';

// Import Proxy Module & UseCases
import { ZoneUsecasesProxyModule } from '../../usecases-proxy/zone-usecases-proxy.module';
import { CreateZoneUsecase } from '@usecases/zone/createZone.usecase';
import { UpdateZoneUsecase } from '@usecases/zone/updateZone.usecase';
import { DeleteZoneUsecase } from '@usecases/zone/deleteZone.usecase';
import { LoadAllZoneUsecase } from '@usecases/zone/loadAllZone.usecase';
import { LoadZoneByIdUsecase } from '@usecases/zone/loadZoneById.usecase';
import { RestoreZoneUsecase } from '@usecases/zone/restoreZone.usecase';

@Controller('zones')
export class ZoneController {
    constructor(
        @Inject(ZoneUsecasesProxyModule.CREATE_ZONE_PROXY)
        private readonly createZoneUseCase: CreateZoneUsecase,

        @Inject(ZoneUsecasesProxyModule.UPDATE_ZONE_PROXY)
        private readonly updateZoneUseCase: UpdateZoneUsecase,

        @Inject(ZoneUsecasesProxyModule.DELETE_ZONE_PROXY)
        private readonly deleteZoneUseCase: DeleteZoneUsecase,

        @Inject(ZoneUsecasesProxyModule.LOAD_ALL_ZONE_PROXY)
        private readonly loadAllZoneUseCase: LoadAllZoneUsecase,

        @Inject(ZoneUsecasesProxyModule.LOAD_BY_ID_ZONE_PROXY)
        private readonly loadZoneByIdUseCase: LoadZoneByIdUsecase,

        @Inject(ZoneUsecasesProxyModule.RESTORE_ZONE_PROXY)
        private readonly restoreZoneUseCase: RestoreZoneUsecase,
    ) { }

    // ==========================================
    // GET: Get All (Basic) or Search
    // ==========================================
    @Post('search') // Use POST to send QueryProps (Filter/Sort) easily
    @HttpCode(HttpStatus.OK)
    @GrpcMethod('ZoneService', 'FindAll')
    async findAll(@Body() query: QueryProps) {
        return await this.loadAllZoneUseCase.execute(query);
    }

    // ==========================================
    // GET: Get By ID
    // ==========================================
    @Get(':id')
    @GrpcMethod('ZoneService', 'FindOne')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.loadZoneByIdUseCase.execute({ id });
    }

    // ==========================================
    // POST: Create
    // ==========================================
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @GrpcMethod('ZoneService', 'Create')
    async create(@Body() body: CreateZoneRequest) {
        return await this.createZoneUseCase.execute(body);
    }

    // ==========================================
    // PUT: Update
    // ==========================================
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @GrpcMethod('ZoneService', 'Update')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Omit<UpdateZoneRequest, 'id'>
    ) {
        const request: UpdateZoneRequest = { id, ...body };
        return await this.updateZoneUseCase.execute(request);
    }

    // ==========================================
    // DELETE: Delete
    // ==========================================
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @GrpcMethod('ZoneService', 'Delete')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const request: DeleteZoneRequest = { id };
        return await this.deleteZoneUseCase.execute(request);
    }

    // ==========================================
    // POST: Restore
    // ==========================================
    @Post(':id/restore')
    @HttpCode(HttpStatus.OK)
    @GrpcMethod('ZoneService', 'Restore')
    async restore(@Param('id', ParseIntPipe) id: number) {
        return await this.restoreZoneUseCase.execute(id);
    }
}
