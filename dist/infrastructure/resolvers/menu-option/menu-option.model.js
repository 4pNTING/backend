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
exports.LoadMenuOptionByMenuItemDto = exports.DeleteMenuOptionDto = exports.UpdateMenuOptionDto = exports.CreateMenuOptionDto = exports.DeleteMenuOptionResponse = exports.UpdateMenuOptionResponse = exports.CreateMenuOptionResponse = exports.LoadMenuOptionResponse = exports.MenuOption = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../domain/enums/enum");
let MenuOption = class MenuOption {
};
exports.MenuOption = MenuOption;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MenuOption.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MenuOption.prototype, "menuItemId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MenuOption.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], MenuOption.prototype, "extraPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MenuOption.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], MenuOption.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], MenuOption.prototype, "updatedAt", void 0);
exports.MenuOption = MenuOption = __decorate([
    (0, graphql_1.ObjectType)()
], MenuOption);
let LoadMenuOptionResponse = class LoadMenuOptionResponse {
};
exports.LoadMenuOptionResponse = LoadMenuOptionResponse;
__decorate([
    (0, graphql_1.Field)(() => [MenuOption]),
    __metadata("design:type", Array)
], LoadMenuOptionResponse.prototype, "menuOption", void 0);
exports.LoadMenuOptionResponse = LoadMenuOptionResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadMenuOptionResponse);
let CreateMenuOptionResponse = class CreateMenuOptionResponse {
};
exports.CreateMenuOptionResponse = CreateMenuOptionResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuOption, { nullable: true }),
    __metadata("design:type", MenuOption)
], CreateMenuOptionResponse.prototype, "menuOption", void 0);
exports.CreateMenuOptionResponse = CreateMenuOptionResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMenuOptionResponse);
let UpdateMenuOptionResponse = class UpdateMenuOptionResponse {
};
exports.UpdateMenuOptionResponse = UpdateMenuOptionResponse;
__decorate([
    (0, graphql_1.Field)(() => MenuOption, { nullable: true }),
    __metadata("design:type", MenuOption)
], UpdateMenuOptionResponse.prototype, "menuOption", void 0);
exports.UpdateMenuOptionResponse = UpdateMenuOptionResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateMenuOptionResponse);
let DeleteMenuOptionResponse = class DeleteMenuOptionResponse {
};
exports.DeleteMenuOptionResponse = DeleteMenuOptionResponse;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeleteMenuOptionResponse.prototype, "_id", void 0);
exports.DeleteMenuOptionResponse = DeleteMenuOptionResponse = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMenuOptionResponse);
let CreateMenuOptionDto = class CreateMenuOptionDto {
};
exports.CreateMenuOptionDto = CreateMenuOptionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuOptionDto.prototype, "menuItemId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMenuOptionDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMenuOptionDto.prototype, "extraPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuOptionDto.prototype, "isActive", void 0);
exports.CreateMenuOptionDto = CreateMenuOptionDto = __decorate([
    (0, graphql_1.InputType)()
], CreateMenuOptionDto);
let UpdateMenuOptionDto = class UpdateMenuOptionDto {
};
exports.UpdateMenuOptionDto = UpdateMenuOptionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMenuOptionDto.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuOptionDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMenuOptionDto.prototype, "extraPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuOptionDto.prototype, "isActive", void 0);
exports.UpdateMenuOptionDto = UpdateMenuOptionDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateMenuOptionDto);
let DeleteMenuOptionDto = class DeleteMenuOptionDto {
};
exports.DeleteMenuOptionDto = DeleteMenuOptionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteMenuOptionDto.prototype, "_id", void 0);
exports.DeleteMenuOptionDto = DeleteMenuOptionDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteMenuOptionDto);
let LoadMenuOptionByMenuItemDto = class LoadMenuOptionByMenuItemDto {
};
exports.LoadMenuOptionByMenuItemDto = LoadMenuOptionByMenuItemDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadMenuOptionByMenuItemDto.prototype, "menuItemId", void 0);
exports.LoadMenuOptionByMenuItemDto = LoadMenuOptionByMenuItemDto = __decorate([
    (0, graphql_1.InputType)()
], LoadMenuOptionByMenuItemDto);
//# sourceMappingURL=menu-option.model.js.map