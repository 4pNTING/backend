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
var AttachmentResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
const attachment_model_1 = require("./attachment.model");
const attachment_usecases_proxy_module_1 = require("../../usecases-proxy/attachment-usecases-proxy.module");
const createAttachment_usecase_1 = require("../../../usecases/attachment/createAttachment.usecase");
const updateAttachment_usecase_1 = require("../../../usecases/attachment/updateAttachment.usecase");
const deleteAttachment_usecase_1 = require("../../../usecases/attachment/deleteAttachment.usecase");
const loadAllAttachment_usecase_1 = require("../../../usecases/attachment/loadAllAttachment.usecase");
const loadAttachmentById_usecase_1 = require("../../../usecases/attachment/loadAttachmentById.usecase");
const restoreAttachment_usecase_1 = require("../../../usecases/attachment/restoreAttachment.usecase");
let AttachmentResolver = AttachmentResolver_1 = class AttachmentResolver {
    constructor(createAttachmentUseCase, updateAttachmentUseCase, deleteAttachmentUseCase, loadAttachmentUseCase, loadAttachmentByIdUseCase, restoreAttachmentUseCase) {
        this.createAttachmentUseCase = createAttachmentUseCase;
        this.updateAttachmentUseCase = updateAttachmentUseCase;
        this.deleteAttachmentUseCase = deleteAttachmentUseCase;
        this.loadAttachmentUseCase = loadAttachmentUseCase;
        this.loadAttachmentByIdUseCase = loadAttachmentByIdUseCase;
        this.restoreAttachmentUseCase = restoreAttachmentUseCase;
        this.logger = new common_1.Logger(AttachmentResolver_1.name);
    }
    async loadAttachment(input) {
        const query = {};
        if (input) {
            if (input.page || input.limit) {
                query.paginate = {
                    page: input.page,
                    limit: input.limit,
                };
            }
            if (input.keyword) {
                query.search = { q: input.keyword };
            }
            if (input.isActive) {
                query.isActive = input.isActive;
            }
            if (input.sortField) {
                query.sortField = input.sortField;
            }
            if (input.sortDirection) {
                query.sortDirection = input.sortDirection;
            }
            if (input.ownerId) {
                query.ownerId = input.ownerId;
            }
            if (input.ownerType) {
                query.ownerType = input.ownerType;
            }
        }
        const result = await this.loadAttachmentUseCase.execute(query);
        return {
            attachment: result.items,
            count: result.total,
        };
    }
    async loadAttachmentById(input) {
        const result = await this.loadAttachmentByIdUseCase.execute({ _id: input._id });
        if (!result)
            return { attachment: null };
        return { attachment: result };
    }
    async createAttachment(input) {
        const result = await this.createAttachmentUseCase.execute(input);
        return { attachment: result };
    }
    async updateAttachment(input) {
        await this.updateAttachmentUseCase.execute(input);
        const updated = await this.loadAttachmentByIdUseCase.execute({ _id: input._id });
        return { attachment: updated };
    }
    async deleteAttachment(input) {
        await this.deleteAttachmentUseCase.execute(input);
        return { attachment: { _id: input._id } };
    }
    async restoreAttachment(input) {
        const result = await this.restoreAttachmentUseCase.execute(input._id);
        return { attachment: result };
    }
};
exports.AttachmentResolver = AttachmentResolver;
__decorate([
    (0, graphql_1.Query)(() => attachment_model_1.LoadAttachmentResponse, { name: 'loadAttachment' }),
    __param(0, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.LoadAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "loadAttachment", null);
__decorate([
    (0, graphql_1.Query)(() => attachment_model_1.LoadAttachmentByIdResponse, { name: 'loadAttachmentById', nullable: true }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.LoadAttachmentByIdDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "loadAttachmentById", null);
__decorate([
    (0, graphql_1.Mutation)(() => attachment_model_1.CreateAttachmentResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.CreateAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "createAttachment", null);
__decorate([
    (0, graphql_1.Mutation)(() => attachment_model_1.UpdateAttachmentResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.UpdateAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "updateAttachment", null);
__decorate([
    (0, graphql_1.Mutation)(() => attachment_model_1.DeleteAttachmentResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.DeleteAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "deleteAttachment", null);
__decorate([
    (0, graphql_1.Mutation)(() => attachment_model_1.RestoreAttachmentResponse),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attachment_model_1.RestoreAttachmentDto]),
    __metadata("design:returntype", Promise)
], AttachmentResolver.prototype, "restoreAttachment", null);
exports.AttachmentResolver = AttachmentResolver = AttachmentResolver_1 = __decorate([
    (0, graphql_1.Resolver)(() => attachment_model_1.Attachment),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY)),
    __param(1, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.UPDATE_ATTACHMENT_PROXY)),
    __param(2, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.DELETE_ATTACHMENT_PROXY)),
    __param(3, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.LOAD_ATTACHMENT_PROXY)),
    __param(4, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.LOAD_BY_ID_ATTACHMENT_PROXY)),
    __param(5, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.RESTORE_ATTACHMENT_PROXY)),
    __metadata("design:paramtypes", [createAttachment_usecase_1.CreateAttachmentUseCase,
        updateAttachment_usecase_1.UpdateAttachmentUseCase,
        deleteAttachment_usecase_1.DeleteAttachmentUseCase,
        loadAllAttachment_usecase_1.LoadAttachmentUseCase,
        loadAttachmentById_usecase_1.LoadByIDAttachmentUseCase,
        restoreAttachment_usecase_1.RestoreAttachmentUseCase])
], AttachmentResolver);
//# sourceMappingURL=attachment.resolver.js.map