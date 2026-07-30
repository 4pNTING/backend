"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableValidation = void 0;
const table_model_1 = require("../../../../domain/models/table.model");
const common_1 = require("@nestjs/common");
class CreateTableValidation extends table_model_1.CreateTableRequest {
    constructor(tableRepository) {
        super();
        this.tableRepository = tableRepository;
    }
    async execute(params) {
        try {
            await this.buildParams(params);
            await this.validateParams();
        }
        catch (error) {
            throw error;
        }
    }
    async buildParams(params) {
        this.number = params.number;
        this.zoneId = params.zoneId;
    }
    async validateParams() {
        if (!this.number || this.number.trim() === '') {
            throw new common_1.BadRequestException('Table number is required');
        }
        if (!this.zoneId) {
            throw new common_1.BadRequestException('Zone ID is required');
        }
        const exist = await this.tableRepository.findOne({ where: { number: this.number } });
        if (exist) {
            throw new common_1.ConflictException(`Table number "${this.number}" already exists`);
        }
    }
}
exports.CreateTableValidation = CreateTableValidation;
//# sourceMappingURL=createTable.validation.js.map