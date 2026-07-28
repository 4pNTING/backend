"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadCustomerByIdResponse = exports.LoadCustomerByIdRequest = exports.LoadAllCustomerResponse = exports.LoadAllCustomerRequest = exports.RestoreCustomerResponse = exports.RestoreCustomerRequest = exports.DeleteCustomerResponse = exports.DeleteCustomerRequest = exports.UpdateCustomerResponse = exports.UpdateCustomerRequest = exports.CreateCustomerResponse = exports.CreateCustomerRequest = exports.CustomerModel = exports.CustomerContactModel = void 0;
const contact_model_1 = require("./contact.model");
class CustomerContactModel extends contact_model_1.ContactModel {
}
exports.CustomerContactModel = CustomerContactModel;
class CustomerModel {
}
exports.CustomerModel = CustomerModel;
class CreateCustomerRequest {
}
exports.CreateCustomerRequest = CreateCustomerRequest;
class CreateCustomerResponse extends CustomerModel {
}
exports.CreateCustomerResponse = CreateCustomerResponse;
class UpdateCustomerRequest {
}
exports.UpdateCustomerRequest = UpdateCustomerRequest;
class UpdateCustomerResponse {
}
exports.UpdateCustomerResponse = UpdateCustomerResponse;
class DeleteCustomerRequest {
}
exports.DeleteCustomerRequest = DeleteCustomerRequest;
class DeleteCustomerResponse {
}
exports.DeleteCustomerResponse = DeleteCustomerResponse;
class RestoreCustomerRequest {
}
exports.RestoreCustomerRequest = RestoreCustomerRequest;
class RestoreCustomerResponse extends CustomerModel {
}
exports.RestoreCustomerResponse = RestoreCustomerResponse;
class LoadAllCustomerRequest {
}
exports.LoadAllCustomerRequest = LoadAllCustomerRequest;
class LoadAllCustomerResponse {
}
exports.LoadAllCustomerResponse = LoadAllCustomerResponse;
class LoadCustomerByIdRequest {
}
exports.LoadCustomerByIdRequest = LoadCustomerByIdRequest;
class LoadCustomerByIdResponse extends CustomerModel {
}
exports.LoadCustomerByIdResponse = LoadCustomerByIdResponse;
//# sourceMappingURL=customer.model.js.map