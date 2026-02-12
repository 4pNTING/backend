// Base Model
export class ZoneModel {
    id: number;
    name: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// ==============================
// CREATE
// ==============================
export class CreateZoneRequest {
    name: string;
    description?: string;
    isActive?: boolean;
}

export class CreateZoneResponse extends ZoneModel { }

// ==============================
// UPDATE
// ==============================
export class UpdateZoneRequest {
    id: number;
    name?: string;
    description?: string;
    isActive?: boolean;
}

export class UpdateZoneResponse {
    id: number;
    success: boolean;
}

// ==============================
// DELETE
// ==============================
export class DeleteZoneRequest {
    id: number;
}

export class DeleteZoneResponse {
    id: number;
    success: boolean;
}

// ==============================
// RESTORE
// ==============================
export class RestoreZoneRequest {
    id: number;
}

export class RestoreZoneResponse extends ZoneModel { }

// ==============================
// LOAD ALL
// ==============================
export class LoadAllZoneRequest {
    // QueryProps handled in controller/resolver
}

export class LoadAllZoneResponse {
    items: ZoneModel[];
    total: number;
}

// ==============================
// LOAD BY ID
// ==============================
export class LoadZoneByIdRequest {
    id: number;
}

export class LoadZoneByIdResponse extends ZoneModel { }
