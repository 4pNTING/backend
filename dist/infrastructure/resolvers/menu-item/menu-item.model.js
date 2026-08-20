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
exports.RestoreMenuItemDto = exports.LoadMenuItemByCategoryDto = exports.DeleteMenuItemDto = exports.LoadMenuItemByIdDto = exports.LoadMenuItemDto = exports.UpdateMenuItemDto = exports.CreateMenuItemDto = exports.DeleteMenuItemResponse = exports.UpdateMenuItemResponse = exports.CreateMenuItemResponse = exports.LoadMenuItemByIdResponse = exports.RestoreMenuItemResponse = exports.LoadMenuItemResponse = exports.MenuItem = exports.ActiveStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_model_1 = require("../../common/graphql/common.model");
Object.defineProperty(exports, "ActiveStatus", { enumerable: true, get: function () { return common_model_1.ActiveStatus; } });
let MenuItem = class MenuItem {
};
exports.MenuItem = MenuItem;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], MenuItem.prototype, "uniqueId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MenuItem.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], MenuItem.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MenuItem.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], MenuItem.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], MenuItem.prototype, "updatedAt", void 0);
exports.MenuItem = MenuItem = __decorate([
    (0, graphql_1.ObjectType)()
], MenuItem);
let LoadMenuItemResponse = class LoadMenuItemResponse {
};
exports.LoadMenuItemResponse = LoadMenuItemResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], LoadMenuItemResponse.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [MenuItem]),
    __metadata("design:type", Array)
], LoadMenuItemResponse.prototype, "menuItem", void 0);
exports.LoadMenuItemResponse = LoadMenuItemResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadMenuItemResponse);
let RestoreMenuItemResponse = class RestoreMenuItemResponse {
};
exports.RestoreMenuItemResponse = RestoreMenuItemResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuItem),
    __metadata("design:type", MenuItem)
], RestoreMenuItemResponse.prototype, "menuItem", void 0);
exports.RestoreMenuItemResponse = RestoreMenuItemResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RestoreMenuItemResponse);
let LoadMenuItemByIdResponse = class LoadMenuItemByIdResponse {
};
exports.LoadMenuItemByIdResponse = LoadMenuItemByIdResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuItem, { nullable: true }),
    __metadata("design:type", MenuItem)
], LoadMenuItemByIdResponse.prototype, "menuItem", void 0);
exports.LoadMenuItemByIdResponse = LoadMenuItemByIdResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadMenuItemByIdResponse);
let CreateMenuItemResponse = class CreateMenuItemResponse {
};
exports.CreateMenuItemResponse = CreateMenuItemResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuItem, { nullable: true }),
    __metadata("design:type", MenuItem)
], CreateMenuItemResponse.prototype, "menuItem", void 0);
exports.CreateMenuItemResponse = CreateMenuItemResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMenuItemResponse);
let UpdateMenuItemResponse = class UpdateMenuItemResponse {
};
exports.UpdateMenuItemResponse = UpdateMenuItemResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuItem, { nullable: true }),
    __metadata("design:type", MenuItem)
], UpdateMenuItemResponse.prototype, "menuItem", void 0);
exports.UpdateMenuItemResponse = UpdateMenuItemResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateMenuItemResponse);
let DeleteMenuItemResponse = class DeleteMenuItemResponse {
};
exports.DeleteMenuItemResponse = DeleteMenuItemResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuItem, { nullable: true }),
    __metadata("design:type", MenuItem)
], DeleteMenuItemResponse.prototype, "menuItem", void 0);
exports.DeleteMenuItemResponse = DeleteMenuItemResponse = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMenuItemResponse);
let CreateMenuItemDto = class CreateMenuItemDto {
};
exports.CreateMenuItemDto = CreateMenuItemDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMenuItemDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "isActive", void 0);
exports.CreateMenuItemDto = CreateMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], CreateMenuItemDto);
let UpdateMenuItemDto = class UpdateMenuItemDto {
};
exports.UpdateMenuItemDto = UpdateMenuItemDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMenuItemDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuItemDto.prototype, "isActive", void 0);
exports.UpdateMenuItemDto = UpdateMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateMenuItemDto);
let LoadMenuItemDto = class LoadMenuItemDto {
};
exports.LoadMenuItemDto = LoadMenuItemDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadMenuItemDto.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadMenuItemDto.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadMenuItemDto.prototype, "categoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_model_1.ActiveStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadMenuItemDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadMenuItemDto.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadMenuItemDto.prototype, "sortField", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadMenuItemDto.prototype, "sortDirection", void 0);
exports.LoadMenuItemDto = LoadMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], LoadMenuItemDto);
let LoadMenuItemByIdDto = class LoadMenuItemByIdDto {
};
exports.LoadMenuItemByIdDto = LoadMenuItemByIdDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadMenuItemByIdDto.prototype, "_id", void 0);
exports.LoadMenuItemByIdDto = LoadMenuItemByIdDto = __decorate([
    (0, graphql_1.InputType)()
], LoadMenuItemByIdDto);
let DeleteMenuItemDto = class DeleteMenuItemDto {
};
exports.DeleteMenuItemDto = DeleteMenuItemDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteMenuItemDto.prototype, "_id", void 0);
exports.DeleteMenuItemDto = DeleteMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteMenuItemDto);
let LoadMenuItemByCategoryDto = class LoadMenuItemByCategoryDto {
};
exports.LoadMenuItemByCategoryDto = LoadMenuItemByCategoryDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadMenuItemByCategoryDto.prototype, "categoryId", void 0);
exports.LoadMenuItemByCategoryDto = LoadMenuItemByCategoryDto = __decorate([
    (0, graphql_1.InputType)()
], LoadMenuItemByCategoryDto);
let RestoreMenuItemDto = class RestoreMenuItemDto {
};
exports.RestoreMenuItemDto = RestoreMenuItemDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RestoreMenuItemDto.prototype, "_id", void 0);
exports.RestoreMenuItemDto = RestoreMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], RestoreMenuItemDto);
//# sourceMappingURL=menu-item.model.js.map