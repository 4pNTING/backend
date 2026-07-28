export declare enum Role {
    USER = "user",
    MANAGER = "manager",
    ADMIN = "admin",
    STAFF = "staff"
}
export declare enum ActiveStatus {
    active = "active",
    inactive = "inactive",
    all = "all"
}
export declare enum InventoryMovementType {
    IN = "in",
    OUT = "out",
    TRANSFER = "transfer",
    ADJUST = "adjust"
}
export declare enum TableStatus {
    available = "available",
    occupied = "occupied",
    reserved = "reserved",
    bill = "bill"
}
export declare enum OrderStatus {
    pending = "pending",
    confirmed = "confirmed",
    preparing = "preparing",
    served = "served",
    paid = "paid",
    cancelled = "cancelled"
}
export declare enum PaymentMethod {
    cash = "cash",
    card = "card",
    qr = "qr",
    wallet = "wallet"
}
export declare enum AttachmentStatus {
    pending = "pending",
    processing = "processing",
    completed = "completed",
    failed = "failed"
}
