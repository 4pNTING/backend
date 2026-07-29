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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadAttachmentByOwnerResponse = exports.LoadAttachmentByOwnerDto = exports.LoadAttachmentDto = exports.RestoreAttachmentDto = exports.DeleteAttachmentDto = exports.LoadAttachmentByIdDto = exports.UpdateAttachmentDto = exports.CreateAttachmentDto = exports.RestoreAttachmentResponse = exports.DeleteAttachmentResponse = exports.UpdateAttachmentResponse = exports.CreateAttachmentResponse = exports.LoadAttachmentByIdResponse = exports.LoadAttachmentResponse = exports.Attachment = exports.AttachmentStatus = exports.ActiveStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_model_1 = require("../../common/graphql/common.model");
Object.defineProperty(exports, "ActiveStatus", { enumerable: true, get: function () { return common_model_1.ActiveStatus; } });
const enum_1 = require("../../../domain/enums/enum");
Object.defineProperty(exports, "AttachmentStatus", { enumerable: true, get: function () { return enum_1.AttachmentStatus; } });
let Attachment = class Attachment {
};
exports.Attachment = Attachment;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Attachment.prototype, "uniqueId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "ownerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "originalName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "filePath", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.Float, { nullable: true }),
    __metadata("design:type", Number)
], Attachment.prototype, "fileSize", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "mimeType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "uploadType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.AttachmentStatus, { nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "errorMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Attachment.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Attachment.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Attachment.prototype, "updatedBy", void 0);
exports.Attachment = Attachment = __decorate([
    (0, graphql_1.ObjectType)()
], Attachment);
const graphql_2 = require("@nestjs/graphql");
let LoadAttachmentResponse = class LoadAttachmentResponse {
};
exports.LoadAttachmentResponse = LoadAttachmentResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], LoadAttachmentResponse.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Attachment]),
    __metadata("design:type", Array)
], LoadAttachmentResponse.prototype, "attachment", void 0);
exports.LoadAttachmentResponse = LoadAttachmentResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadAttachmentResponse);
let LoadAttachmentByIdResponse = class LoadAttachmentByIdResponse {
};
exports.LoadAttachmentByIdResponse = LoadAttachmentByIdResponse;
__decorate([
    (0, graphql_1.Field)(() => Attachment, { nullable: true }),
    __metadata("design:type", Attachment)
], LoadAttachmentByIdResponse.prototype, "attachment", void 0);
exports.LoadAttachmentByIdResponse = LoadAttachmentByIdResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadAttachmentByIdResponse);
let CreateAttachmentResponse = class CreateAttachmentResponse {
};
exports.CreateAttachmentResponse = CreateAttachmentResponse;
__decorate([
    (0, graphql_1.Field)(() => Attachment, { nullable: true }),
    __metadata("design:type", Attachment)
], CreateAttachmentResponse.prototype, "attachment", void 0);
exports.CreateAttachmentResponse = CreateAttachmentResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateAttachmentResponse);
let UpdateAttachmentResponse = class UpdateAttachmentResponse {
};
exports.UpdateAttachmentResponse = UpdateAttachmentResponse;
__decorate([
    (0, graphql_1.Field)(() => Attachment, { nullable: true }),
    __metadata("design:type", Attachment)
], UpdateAttachmentResponse.prototype, "attachment", void 0);
exports.UpdateAttachmentResponse = UpdateAttachmentResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateAttachmentResponse);
let DeleteAttachmentResponse = class DeleteAttachmentResponse {
};
exports.DeleteAttachmentResponse = DeleteAttachmentResponse;
__decorate([
    (0, graphql_1.Field)(() => Attachment, { nullable: true }),
    __metadata("design:type", Attachment)
], DeleteAttachmentResponse.prototype, "attachment", void 0);
exports.DeleteAttachmentResponse = DeleteAttachmentResponse = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteAttachmentResponse);
let RestoreAttachmentResponse = class RestoreAttachmentResponse {
};
exports.RestoreAttachmentResponse = RestoreAttachmentResponse;
__decorate([
    (0, graphql_1.Field)(() => Attachment, { nullable: true }),
    __metadata("design:type", Attachment)
], RestoreAttachmentResponse.prototype, "attachment", void 0);
exports.RestoreAttachmentResponse = RestoreAttachmentResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RestoreAttachmentResponse);
let CreateAttachmentDto = class CreateAttachmentDto {
};
exports.CreateAttachmentDto = CreateAttachmentDto;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "ownerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "originalName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "fileName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "filePath", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAttachmentDto.prototype, "fileSize", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "mimeType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "uploadType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.AttachmentStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "errorMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "isActive", void 0);
exports.CreateAttachmentDto = CreateAttachmentDto = __decorate([
    (0, graphql_1.InputType)()
], CreateAttachmentDto);
let UpdateAttachmentDto = class UpdateAttachmentDto {
};
exports.UpdateAttachmentDto = UpdateAttachmentDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "ownerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "originalName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "fileName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "filePath", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAttachmentDto.prototype, "fileSize", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "mimeType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "uploadType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.AttachmentStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "errorMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAttachmentDto.prototype, "isActive", void 0);
exports.UpdateAttachmentDto = UpdateAttachmentDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateAttachmentDto);
let LoadAttachmentByIdDto = class LoadAttachmentByIdDto {
};
exports.LoadAttachmentByIdDto = LoadAttachmentByIdDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadAttachmentByIdDto.prototype, "_id", void 0);
exports.LoadAttachmentByIdDto = LoadAttachmentByIdDto = __decorate([
    (0, graphql_1.InputType)()
], LoadAttachmentByIdDto);
let DeleteAttachmentDto = class DeleteAttachmentDto {
};
exports.DeleteAttachmentDto = DeleteAttachmentDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteAttachmentDto.prototype, "_id", void 0);
exports.DeleteAttachmentDto = DeleteAttachmentDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteAttachmentDto);
let RestoreAttachmentDto = class RestoreAttachmentDto {
};
exports.RestoreAttachmentDto = RestoreAttachmentDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RestoreAttachmentDto.prototype, "_id", void 0);
exports.RestoreAttachmentDto = RestoreAttachmentDto = __decorate([
    (0, graphql_1.InputType)()
], RestoreAttachmentDto);
let LoadAttachmentDto = class LoadAttachmentDto {
};
exports.LoadAttachmentDto = LoadAttachmentDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadAttachmentDto.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadAttachmentDto.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_model_1.ActiveStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "sortField", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "sortDirection", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentDto.prototype, "ownerType", void 0);
exports.LoadAttachmentDto = LoadAttachmentDto = __decorate([
    (0, graphql_1.InputType)()
], LoadAttachmentDto);
let LoadAttachmentByOwnerDto = class LoadAttachmentByOwnerDto {
};
exports.LoadAttachmentByOwnerDto = LoadAttachmentByOwnerDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadAttachmentByOwnerDto.prototype, "ownerId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadAttachmentByOwnerDto.prototype, "ownerType", void 0);
exports.LoadAttachmentByOwnerDto = LoadAttachmentByOwnerDto = __decorate([
    (0, graphql_1.InputType)()
], LoadAttachmentByOwnerDto);
let LoadAttachmentByOwnerResponse = class LoadAttachmentByOwnerResponse {
};
exports.LoadAttachmentByOwnerResponse = LoadAttachmentByOwnerResponse;
__decorate([
    (0, graphql_1.Field)(() => [Attachment]),
    __metadata("design:type", Array)
], LoadAttachmentByOwnerResponse.prototype, "attachment", void 0);
exports.LoadAttachmentByOwnerResponse = LoadAttachmentByOwnerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadAttachmentByOwnerResponse);
//# sourceMappingURL=attachment.model.js.map