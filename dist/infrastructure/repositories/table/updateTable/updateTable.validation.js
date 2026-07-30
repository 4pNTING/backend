"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableValidation = void 0;
const table_model_1 = require("../../../../domain/models/table.model");
const common_1 = require("@nestjs/common");
class UpdateTableValidation extends table_model_1.UpdateTableRequest {
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
        this._id = params._id;
        this.number = params.number;
    }
    async validateParams() {
        if (!this._id) {
            throw new common_1.BadRequestException('Table ID is required');
        }
        const exist = await this.tableRepository.findOne({ where: { _id: this._id } });
        if (!exist) {
            throw new common_1.NotFoundException(`Table not found`);
        }
        if (this.number) {
            const duplicate = await this.tableRepository.findOne({ where: { number: this.number } });
            if (duplicate && duplicate._id !== this._id) {
                throw new common_1.BadRequestException(`Table number "${this.number}" already exists`);
            }
        }
    }
}
exports.UpdateTableValidation = UpdateTableValidation;
//# sourceMappingURL=updateTable.validation.js.map