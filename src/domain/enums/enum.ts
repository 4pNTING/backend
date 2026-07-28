import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    USER = 'user',
    MANAGER = 'manager',
    ADMIN = 'admin',
    STAFF = 'staff',
}

export enum ActiveStatus {
    active = 'active',
    inactive = 'inactive',
    all = 'all'
}

registerEnumType(ActiveStatus, {
    name: 'ActiveStatus',
    description: 'Filter for active, inactive, or all items',
});

export enum InventoryMovementType {
    IN = 'in',
    OUT = 'out',
    TRANSFER = 'transfer',
    ADJUST = 'adjust'
}

registerEnumType(InventoryMovementType, {
    name: 'InventoryMovementType',
    description: 'Type of inventory movement: in, out, transfer, or adjust',
});

// ─── Table Status ─────────────────────────────────────────
export enum TableStatus {
    available = 'available',   // ว่าง
    occupied  = 'occupied',    // มีลูกค้า
    reserved  = 'reserved',    // จอง
    bill      = 'bill',        // รอชำระเงิน
}

registerEnumType(TableStatus, {
    name: 'TableStatus',
    description: 'Status of a restaurant table',
});

// ─── Order Status ─────────────────────────────────────────
export enum OrderStatus {
    pending    = 'pending',    // รอยืนยัน
    confirmed  = 'confirmed',  // ยืนยันแล้ว
    preparing  = 'preparing',  // กำลังเตรียม
    served     = 'served',     // เสิร์ฟแล้ว
    paid       = 'paid',       // ชำระแล้ว
    cancelled  = 'cancelled',  // ยกเลิก
}

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
    description: 'Lifecycle status of a customer order',
});

// ─── Payment Method ───────────────────────────────────────
export enum PaymentMethod {
    cash   = 'cash',    // เงินสด
    card   = 'card',    // บัตรเครดิต/เดบิต
    qr     = 'qr',      // QR Code
    wallet = 'wallet',  // e-Wallet
}

registerEnumType(PaymentMethod, {
    name: 'PaymentMethod',
    description: 'Payment method used for an order',
});

// ─── Attachment Status ────────────────────────────────────
export enum AttachmentStatus {
    pending    = 'pending',     // อยู่ในคิวประมวลผล
    processing = 'processing',  // กำลังประมวลผล
    completed  = 'completed',   // ประมวลผลเสร็จสมบูรณ์
    failed     = 'failed',      // ประมวลผลล้มเหลว
}

registerEnumType(AttachmentStatus, {
    name: 'AttachmentStatus',
    description: 'Status of file attachment processing',
});

