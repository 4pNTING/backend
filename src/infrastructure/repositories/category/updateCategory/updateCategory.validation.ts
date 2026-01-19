import { Repository, Not } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { UpdateCategoryRequest } from '@domain/models/category.model';

export class UpdateCategoryValidation extends UpdateCategoryRequest {
  constructor(private readonly categoryRepository: Repository<CategoryEntity>) {
    super();
  }

  // ✅ แก้ไข: รับแค่ params ตัวเดียว (เพราะ id อยู่ข้างใน params แล้ว)
  public async execute(params: UpdateCategoryRequest): Promise<void> {
    try {
      // 1. Build Params
      this.id = params.id; // ดึง id จาก params
      this.name = params.name;
      this.description = params.description;
      this.photo = params.photo;

      // 2. Validate
      await this.validateParams();
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  private async validateParams(): Promise<void> {
    // เช็คว่ามี ID นี้จริงไหม
    if (!this.id) {
        throw new Error('Category ID is required');
    }

    const exist = await this.categoryRepository.findOne({ where: { id: this.id } });
    if (!exist) {
      throw new Error(`Category ID ${this.id} not found`);
    }

    // ถ้ามีการแก้ชื่อ ต้องเช็คว่าซ้ำกับคนอื่นไหม
    if (this.name) {
      const duplicate = await this.categoryRepository.findOne({
        where: { 
          name: this.name, 
          id: Not(this.id) 
        }
      });

      if (duplicate) {
        throw new Error(`Category name "${this.name}" is already taken.`);
      }
    }
  }
}