"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const zone_model_1 = require("../../../domain/models/zone.model");
const zone_usecases_proxy_module_1 = require("../../usecases-proxy/zone-usecases-proxy.module");
const createZone_usecase_1 = require("../../../usecases/zone/createZone.usecase");
const updateZone_usecase_1 = require("../../../usecases/zone/updateZone.usecase");
const deleteZone_usecase_1 = require("../../../usecases/zone/deleteZone.usecase");
const loadAllZone_usecase_1 = require("../../../usecases/zone/loadAllZone.usecase");
const loadZoneById_usecase_1 = require("../../../usecases/zone/loadZoneById.usecase");
const restoreZone_usecase_1 = require("../../../usecases/zone/restoreZone.usecase");
let ZoneController = class ZoneController {
    constructor(createZoneUseCase, updateZoneUseCase, deleteZoneUseCase, loadAllZoneUseCase, loadZoneByIdUseCase, restoreZoneUseCase) {
        this.createZoneUseCase = createZoneUseCase;
        this.updateZoneUseCase = updateZoneUseCase;
        this.deleteZoneUseCase = deleteZoneUseCase;
        this.loadAllZoneUseCase = loadAllZoneUseCase;
        this.loadZoneByIdUseCase = loadZoneByIdUseCase;
        this.restoreZoneUseCase = restoreZoneUseCase;
    }
    async findAll(query) {
        return await this.loadAllZoneUseCase.execute(query);
    }
    async findOne(id) {
        return await this.loadZoneByIdUseCase.execute({ _id: id });
    }
    async create(body) {
        return await this.createZoneUseCase.execute(body);
    }
    async update(id, body) {
        const request = { _id: id, ...body };
        return await this.updateZoneUseCase.execute(request);
    }
    async delete(id) {
        const request = { _id: id };
        return await this.deleteZoneUseCase.execute(request);
    }
    async restore(id) {
        return await this.restoreZoneUseCase.execute(id);
    }
};
exports.ZoneController = ZoneController;
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, microservices_1.GrpcMethod)('ZoneService', 'FindAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, microservices_1.GrpcMethod)('ZoneService', 'FindOne'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, microservices_1.GrpcMethod)('ZoneService', 'Create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zone_model_1.CreateZoneRequest]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, microservices_1.GrpcMethod)('ZoneService', 'Update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, microservices_1.GrpcMethod)('ZoneService', 'Delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/restore'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, microservices_1.GrpcMethod)('ZoneService', 'Restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "restore", null);
exports.ZoneController = ZoneController = __decorate([
    (0, common_1.Controller)('zones'),
    __param(0, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.CREATE_ZONE_PROXY)),
    __param(1, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.UPDATE_ZONE_PROXY)),
    __param(2, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.DELETE_ZONE_PROXY)),
    __param(3, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.LOAD_ALL_ZONE_PROXY)),
    __param(4, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.LOAD_BY_ID_ZONE_PROXY)),
    __param(5, (0, common_1.Inject)(zone_usecases_proxy_module_1.ZoneUsecasesProxyModule.RESTORE_ZONE_PROXY)),
    __metadata("design:paramtypes", [createZone_usecase_1.CreateZoneUsecase,
        updateZone_usecase_1.UpdateZoneUsecase,
        deleteZone_usecase_1.DeleteZoneUsecase,
        loadAllZone_usecase_1.LoadAllZoneUsecase,
        loadZoneById_usecase_1.LoadZoneByIdUsecase,
        restoreZone_usecase_1.RestoreZoneUsecase])
], ZoneController);
//# sourceMappingURL=zone.controller.js.map