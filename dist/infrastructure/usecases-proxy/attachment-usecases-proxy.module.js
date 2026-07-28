"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AttachmentUsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentUsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const repositories_module_1 = require("../repositories/repositories.module");
const createAttachment_usecase_1 = require("../../usecases/attachment/createAttachment.usecase");
const updateAttachment_usecase_1 = require("../../usecases/attachment/updateAttachment.usecase");
const deleteAttachment_usecase_1 = require("../../usecases/attachment/deleteAttachment.usecase");
const loadAllAttachment_usecase_1 = require("../../usecases/attachment/loadAllAttachment.usecase");
const loadAttachmentById_usecase_1 = require("../../usecases/attachment/loadAttachmentById.usecase");
const restoreAttachment_usecase_1 = require("../../usecases/attachment/restoreAttachment.usecase");
let AttachmentUsecasesProxyModule = AttachmentUsecasesProxyModule_1 = class AttachmentUsecasesProxyModule {
    static register() {
        return {
            module: AttachmentUsecasesProxyModule_1,
            providers: [
                {
                    provide: AttachmentUsecasesProxyModule_1.CREATE_ATTACHMENT_PROXY,
                    useClass: createAttachment_usecase_1.CreateAttachmentUseCase,
                },
                {
                    provide: AttachmentUsecasesProxyModule_1.UPDATE_ATTACHMENT_PROXY,
                    useClass: updateAttachment_usecase_1.UpdateAttachmentUseCase,
                },
                {
                    provide: AttachmentUsecasesProxyModule_1.DELETE_ATTACHMENT_PROXY,
                    useClass: deleteAttachment_usecase_1.DeleteAttachmentUseCase,
                },
                {
                    provide: AttachmentUsecasesProxyModule_1.LOAD_ATTACHMENT_PROXY,
                    useClass: loadAllAttachment_usecase_1.LoadAttachmentUseCase,
                },
                {
                    provide: AttachmentUsecasesProxyModule_1.LOAD_BY_ID_ATTACHMENT_PROXY,
                    useClass: loadAttachmentById_usecase_1.LoadByIDAttachmentUseCase,
                },
                {
                    provide: AttachmentUsecasesProxyModule_1.RESTORE_ATTACHMENT_PROXY,
                    useClass: restoreAttachment_usecase_1.RestoreAttachmentUseCase,
                },
            ],
            exports: [
                AttachmentUsecasesProxyModule_1.CREATE_ATTACHMENT_PROXY,
                AttachmentUsecasesProxyModule_1.UPDATE_ATTACHMENT_PROXY,
                AttachmentUsecasesProxyModule_1.DELETE_ATTACHMENT_PROXY,
                AttachmentUsecasesProxyModule_1.LOAD_ATTACHMENT_PROXY,
                AttachmentUsecasesProxyModule_1.LOAD_BY_ID_ATTACHMENT_PROXY,
                AttachmentUsecasesProxyModule_1.RESTORE_ATTACHMENT_PROXY,
            ],
        };
    }
};
exports.AttachmentUsecasesProxyModule = AttachmentUsecasesProxyModule;
AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY = 'CREATE_ATTACHMENT_PROXY';
AttachmentUsecasesProxyModule.UPDATE_ATTACHMENT_PROXY = 'UPDATE_ATTACHMENT_PROXY';
AttachmentUsecasesProxyModule.DELETE_ATTACHMENT_PROXY = 'DELETE_ATTACHMENT_PROXY';
AttachmentUsecasesProxyModule.LOAD_ATTACHMENT_PROXY = 'LOAD_ATTACHMENT_PROXY';
AttachmentUsecasesProxyModule.LOAD_BY_ID_ATTACHMENT_PROXY = 'LOAD_BY_ID_ATTACHMENT_PROXY';
AttachmentUsecasesProxyModule.RESTORE_ATTACHMENT_PROXY = 'RESTORE_ATTACHMENT_PROXY';
exports.AttachmentUsecasesProxyModule = AttachmentUsecasesProxyModule = AttachmentUsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [repositories_module_1.RepositoriesModule],
    })
], AttachmentUsecasesProxyModule);
//# sourceMappingURL=attachment-usecases-proxy.module.js.map