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
exports.LoadCustomerDto = exports.RestoreCustomerDto = exports.DeleteCustomerDto = exports.LoadCustomerByIdDto = exports.UpdateCustomerDto = exports.CreateCustomerDto = exports.CustomerContactInput = exports.RestoreCustomerResponse = exports.DeleteCustomerResponse = exports.UpdateCustomerResponse = exports.CreateCustomerResponse = exports.LoadCustomerByIdResponse = exports.LoadCustomerResponse = exports.Customer = exports.CustomerContactType = exports.ActiveStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_model_1 = require("../../common/graphql/common.model");
Object.defineProperty(exports, "ActiveStatus", { enumerable: true, get: function () { return common_model_1.ActiveStatus; } });
let CustomerContactType = class CustomerContactType {
};
exports.CustomerContactType = CustomerContactType;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "province", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CustomerContactType.prototype, "village", void 0);
exports.CustomerContactType = CustomerContactType = __decorate([
    (0, graphql_1.ObjectType)()
], CustomerContactType);
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Customer.prototype, "uniqueId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "uid", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "buId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "updatedBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "nationality", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "province", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "village", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomerContactType, { nullable: true }),
    __metadata("design:type", CustomerContactType)
], Customer.prototype, "contact", void 0);
exports.Customer = Customer = __decorate([
    (0, graphql_1.ObjectType)()
], Customer);
let LoadCustomerResponse = class LoadCustomerResponse {
};
exports.LoadCustomerResponse = LoadCustomerResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], LoadCustomerResponse.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Customer]),
    __metadata("design:type", Array)
], LoadCustomerResponse.prototype, "customer", void 0);
exports.LoadCustomerResponse = LoadCustomerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadCustomerResponse);
let LoadCustomerByIdResponse = class LoadCustomerByIdResponse {
};
exports.LoadCustomerByIdResponse = LoadCustomerByIdResponse;
__decorate([
    (0, graphql_1.Field)(() => Customer, { nullable: true }),
    __metadata("design:type", Customer)
], LoadCustomerByIdResponse.prototype, "customer", void 0);
exports.LoadCustomerByIdResponse = LoadCustomerByIdResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoadCustomerByIdResponse);
let CreateCustomerResponse = class CreateCustomerResponse {
};
exports.CreateCustomerResponse = CreateCustomerResponse;
__decorate([
    (0, graphql_1.Field)(() => Customer, { nullable: true }),
    __metadata("design:type", Customer)
], CreateCustomerResponse.prototype, "customer", void 0);
exports.CreateCustomerResponse = CreateCustomerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], CreateCustomerResponse);
let UpdateCustomerResponse = class UpdateCustomerResponse {
};
exports.UpdateCustomerResponse = UpdateCustomerResponse;
__decorate([
    (0, graphql_1.Field)(() => Customer, { nullable: true }),
    __metadata("design:type", Customer)
], UpdateCustomerResponse.prototype, "customer", void 0);
exports.UpdateCustomerResponse = UpdateCustomerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateCustomerResponse);
let DeleteCustomerResponse = class DeleteCustomerResponse {
};
exports.DeleteCustomerResponse = DeleteCustomerResponse;
__decorate([
    (0, graphql_1.Field)(() => Customer, { nullable: true }),
    __metadata("design:type", Customer)
], DeleteCustomerResponse.prototype, "customer", void 0);
exports.DeleteCustomerResponse = DeleteCustomerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteCustomerResponse);
let RestoreCustomerResponse = class RestoreCustomerResponse {
};
exports.RestoreCustomerResponse = RestoreCustomerResponse;
__decorate([
    (0, graphql_1.Field)(() => Customer, { nullable: true }),
    __metadata("design:type", Customer)
], RestoreCustomerResponse.prototype, "customer", void 0);
exports.RestoreCustomerResponse = RestoreCustomerResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RestoreCustomerResponse);
let CustomerContactInput = class CustomerContactInput {
};
exports.CustomerContactInput = CustomerContactInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "province", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerContactInput.prototype, "village", void 0);
exports.CustomerContactInput = CustomerContactInput = __decorate([
    (0, graphql_1.InputType)()
], CustomerContactInput);
let CreateCustomerDto = class CreateCustomerDto {
};
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "nationality", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "province", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "village", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomerContactInput, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CustomerContactInput)
], CreateCustomerDto.prototype, "contact", void 0);
exports.CreateCustomerDto = CreateCustomerDto = __decorate([
    (0, graphql_1.InputType)()
], CreateCustomerDto);
let UpdateCustomerDto = class UpdateCustomerDto {
};
exports.UpdateCustomerDto = UpdateCustomerDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "nationality", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "province", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "village", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomerContactInput, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CustomerContactInput)
], UpdateCustomerDto.prototype, "contact", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCustomerDto.prototype, "deleteContact", void 0);
exports.UpdateCustomerDto = UpdateCustomerDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateCustomerDto);
let LoadCustomerByIdDto = class LoadCustomerByIdDto {
};
exports.LoadCustomerByIdDto = LoadCustomerByIdDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoadCustomerByIdDto.prototype, "_id", void 0);
exports.LoadCustomerByIdDto = LoadCustomerByIdDto = __decorate([
    (0, graphql_1.InputType)()
], LoadCustomerByIdDto);
let DeleteCustomerDto = class DeleteCustomerDto {
};
exports.DeleteCustomerDto = DeleteCustomerDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteCustomerDto.prototype, "_id", void 0);
exports.DeleteCustomerDto = DeleteCustomerDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteCustomerDto);
let RestoreCustomerDto = class RestoreCustomerDto {
};
exports.RestoreCustomerDto = RestoreCustomerDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RestoreCustomerDto.prototype, "_id", void 0);
exports.RestoreCustomerDto = RestoreCustomerDto = __decorate([
    (0, graphql_1.InputType)()
], RestoreCustomerDto);
let LoadCustomerDto = class LoadCustomerDto {
};
exports.LoadCustomerDto = LoadCustomerDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadCustomerDto.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LoadCustomerDto.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_model_1.ActiveStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadCustomerDto.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadCustomerDto.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadCustomerDto.prototype, "sortField", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoadCustomerDto.prototype, "sortDirection", void 0);
exports.LoadCustomerDto = LoadCustomerDto = __decorate([
    (0, graphql_1.InputType)()
], LoadCustomerDto);
//# sourceMappingURL=customer.model.js.map