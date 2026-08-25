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
exports.LoadTableByZoneDto = exports.RestoreTableDto = exports.DeleteTableDto = exports.LoadTableByIdDto = exports.LoadTableDto = exports.UpdateTableDto = exports.CreateTableDto = exports.RestoreTableResponse = exports.DeleteTableResponse = exports.UpdateTableResponse = exports.CreateTableResponse = exports.LoadTableByIdResponse = exports.LoadTableResponse = exports.Table = exports.TableStatus = exports.ActiveStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../domain/enums/enum");
Object.defineProperty(exports, "ActiveStatus", { enumerable: true, get: function () { return enum_1.ActiveStatus; } });
Object.defineProperty(exports, "TableStatus", { enumerable: true, get: function () { return enum_1.TableStatus; } });
let Table = class Table {
};
exports.Table = Table;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Table.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Table.prototype, "uniqueId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Table.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Table.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Table.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Table.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Table.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Table.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Table.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Table.prototype, "updatedAt", void 0);
exports.Table = Table = __decorate([
    (0, graphql_1.ObjectType)()
], Table);
let LoadTableResponse = class LoadTableResponse {
};
exports.LoadTableResponse = LoadTableResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], LoadTableResponse.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Table]),
    __metadata("design:type", Array)
], LoadTableResponse.prototype, "table", void 0);
exports.LoadTableResponse = LoadTableResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadTableResponse);
let LoadTableByIdResponse = class LoadTableByIdResponse {
};
exports.LoadTableByIdResponse = LoadTableByIdResponse;
__decorate([
    (0, graphql_1.Field)(() => Table, { nullable: true }),
    __metadata("design:type", Table)
], LoadTableByIdResponse.prototype, "table", void 0);
exports.LoadTableByIdResponse = LoadTableByIdResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadTableByIdResponse);
let CreateTableResponse = class CreateTableResponse {
};
exports.CreateTableResponse = CreateTableResponse;
__decorate([
    (0, graphql_1.Field)(() => Table, { nullable: true }),
    __metadata("design:type", Table)
], CreateTableResponse.prototype, "table", void 0);
exports.CreateTableResponse = CreateTableResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateTableResponse);
let UpdateTableResponse = class UpdateTableResponse {
};
exports.UpdateTableResponse = UpdateTableResponse;
__decorate([
    (0, graphql_1.Field)(() => Table, { nullable: true }),
    __metadata("design:type", Table)
], UpdateTableResponse.prototype, "table", void 0);
exports.UpdateTableResponse = UpdateTableResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateTableResponse);
let DeleteTableResponse = class DeleteTableResponse {
};
exports.DeleteTableResponse = DeleteTableResponse;
__decorate([
    (0, graphql_1.Field)(() => Table, { nullable: true }),
    __metadata("design:type", Table)
], DeleteTableResponse.prototype, "table", void 0);
exports.DeleteTableResponse = DeleteTableResponse = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteTableResponse);
let RestoreTableResponse = class RestoreTableResponse {
};
exports.RestoreTableResponse = RestoreTableResponse;
__decorate([
    (0, graphql_1.Field)(() => Table, { nullable: true }),
    __metadata("design:type", Table)
], RestoreTableResponse.prototype, "table", void 0);
exports.RestoreTableResponse = RestoreTableResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RestoreTableResponse);
let CreateTableDto = class CreateTableDto {
};
exports.CreateTableDto = CreateTableDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTableDto.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "isActive", void 0);
exports.CreateTableDto = CreateTableDto = __decorate([
    (0, graphql_1.InputType)()
], CreateTableDto);
let UpdateTableDto = class UpdateTableDto {
};
exports.UpdateTableDto = UpdateTableDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTableDto.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "isActive", void 0);
exports.UpdateTableDto = UpdateTableDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateTableDto);
let LoadTableDto = class LoadTableDto {
};
exports.LoadTableDto = LoadTableDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadTableDto.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadTableDto.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadTableDto.prototype, "zoneId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadTableDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadTableDto.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadTableDto.prototype, "sortField", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadTableDto.prototype, "sortDirection", void 0);
exports.LoadTableDto = LoadTableDto = __decorate([
    (0, graphql_1.InputType)()
], LoadTableDto);
let LoadTableByIdDto = class LoadTableByIdDto {
};
exports.LoadTableByIdDto = LoadTableByIdDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadTableByIdDto.prototype, "_id", void 0);
exports.LoadTableByIdDto = LoadTableByIdDto = __decorate([
    (0, graphql_1.InputType)()
], LoadTableByIdDto);
let DeleteTableDto = class DeleteTableDto {
};
exports.DeleteTableDto = DeleteTableDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteTableDto.prototype, "_id", void 0);
exports.DeleteTableDto = DeleteTableDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteTableDto);
let RestoreTableDto = class RestoreTableDto {
};
exports.RestoreTableDto = RestoreTableDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RestoreTableDto.prototype, "_id", void 0);
exports.RestoreTableDto = RestoreTableDto = __decorate([
    (0, graphql_1.InputType)()
], RestoreTableDto);
let LoadTableByZoneDto = class LoadTableByZoneDto {
};
exports.LoadTableByZoneDto = LoadTableByZoneDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadTableByZoneDto.prototype, "zoneId", void 0);
exports.LoadTableByZoneDto = LoadTableByZoneDto = __decorate([
    (0, graphql_1.InputType)()
], LoadTableByZoneDto);
//# sourceMappingURL=table.model.js.map