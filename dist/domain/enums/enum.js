"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentStatus = exports.PaymentMethod = exports.OrderStatus = exports.TableStatus = exports.InventoryMovementType = exports.ActiveStatus = exports.Role = void 0;
const graphql_1 = require("@nestjs/graphql");
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["MANAGER"] = "manager";
    Role["ADMIN"] = "admin";
    Role["STAFF"] = "staff";
})(Role || (exports.Role = Role = {}));
var ActiveStatus;
(function (ActiveStatus) {
    ActiveStatus["active"] = "active";
    ActiveStatus["inactive"] = "inactive";
    ActiveStatus["all"] = "all";
})(ActiveStatus || (exports.ActiveStatus = ActiveStatus = {}));
(0, graphql_1.registerEnumType)(ActiveStatus, {
    name: 'ActiveStatus',
    description: 'Filter for active, inactive, or all items',
});
var InventoryMovementType;
(function (InventoryMovementType) {
    InventoryMovementType["IN"] = "in";
    InventoryMovementType["OUT"] = "out";
    InventoryMovementType["TRANSFER"] = "transfer";
    InventoryMovementType["ADJUST"] = "adjust";
})(InventoryMovementType || (exports.InventoryMovementType = InventoryMovementType = {}));
(0, graphql_1.registerEnumType)(InventoryMovementType, {
    name: 'InventoryMovementType',
    description: 'Type of inventory movement: in, out, transfer, or adjust',
});
var TableStatus;
(function (TableStatus) {
    TableStatus["available"] = "available";
    TableStatus["occupied"] = "occupied";
    TableStatus["reserved"] = "reserved";
    TableStatus["bill"] = "bill";
})(TableStatus || (exports.TableStatus = TableStatus = {}));
(0, graphql_1.registerEnumType)(TableStatus, {
    name: 'TableStatus',
    description: 'Status of a restaurant table',
});
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["pending"] = "pending";
    OrderStatus["confirmed"] = "confirmed";
    OrderStatus["preparing"] = "preparing";
    OrderStatus["served"] = "served";
    OrderStatus["paid"] = "paid";
    OrderStatus["cancelled"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
(0, graphql_1.registerEnumType)(OrderStatus, {
    name: 'OrderStatus',
    description: 'Lifecycle status of a customer order',
});
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["cash"] = "cash";
    PaymentMethod["card"] = "card";
    PaymentMethod["qr"] = "qr";
    PaymentMethod["wallet"] = "wallet";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
(0, graphql_1.registerEnumType)(PaymentMethod, {
    name: 'PaymentMethod',
    description: 'Payment method used for an order',
});
var AttachmentStatus;
(function (AttachmentStatus) {
    AttachmentStatus["pending"] = "pending";
    AttachmentStatus["processing"] = "processing";
    AttachmentStatus["completed"] = "completed";
    AttachmentStatus["failed"] = "failed";
})(AttachmentStatus || (exports.AttachmentStatus = AttachmentStatus = {}));
(0, graphql_1.registerEnumType)(AttachmentStatus, {
    name: 'AttachmentStatus',
    description: 'Status of file attachment processing',
});
//# sourceMappingURL=enum.js.map