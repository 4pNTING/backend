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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = require("fs");
const attachment_usecases_proxy_module_1 = require("../../usecases-proxy/attachment-usecases-proxy.module");
const createAttachment_usecase_1 = require("../../../usecases/attachment/createAttachment.usecase");
const uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
if (!(0, fs_1.existsSync)(uploadDir)) {
    (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
}
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        if (!(0, fs_1.existsSync)(uploadDir)) {
            (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        const nameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, `${uniqueSuffix}-${nameWithoutExt}${ext}`);
    },
});
let UploadController = class UploadController {
    constructor(createAttachmentUseCase) {
        this.createAttachmentUseCase = createAttachmentUseCase;
    }
    async uploadFile(file, body) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        const fileUrl = `/uploads/${file.filename}`;
        const ownerId = body.ownerId || 'unassigned';
        const ownerType = body.ownerType || 'general';
        const originalName = body.originalName || file.originalname;
        const uploadType = body.uploadType || (file.mimetype.startsWith('image/') ? 'image' : 'pdf');
        const attachment = await this.createAttachmentUseCase.execute({
            ownerId,
            ownerType,
            originalName,
            fileName: file.filename,
            fileUrl,
            filePath: file.path,
            fileSize: file.size,
            mimeType: file.mimetype,
            uploadType,
            status: 'completed',
        });
        return {
            success: true,
            url: fileUrl,
            fileUrl: fileUrl,
            downloadUrl: fileUrl,
            file: {
                _id: attachment._id,
                fileName: file.filename,
                filePath: fileUrl,
                originalName,
            },
            attachment,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage,
        limits: { fileSize: 20 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __param(0, (0, common_1.Inject)(attachment_usecases_proxy_module_1.AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY)),
    __metadata("design:paramtypes", [createAttachment_usecase_1.CreateAttachmentUseCase])
], UploadController);
//# sourceMappingURL=upload.controller.js.map