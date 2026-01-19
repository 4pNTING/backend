import { Repository } from 'typeorm';
import { CategoryEntity } from '@infrastructure/entities/category.entity';
import { CreateCategoryRequest } from '@domain/models/category.model';

// ต้องมีคำว่า export class ถึงจะนับเป็น Module
export class CreateCategoryValidation extends CreateCategoryRequest {
  constructor(private readonly categoryRepository: Repository<CategoryEntity>) {
    super();
  }

  public async execute(params: CreateCategoryRequest): Promise<void> {
    try {
      await this.buildParams(params);
      await this.validateParams();
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  private async buildParams(params: CreateCategoryRequest): Promise<void> {
    try {
      this.name = params.name;
      this.description = params.description;
      this.photo = params.photo;
    } catch (error) {
      console.log('ERROR buildParams', error?.message);
      throw new Error(error?.message || 'Unknown error');
    }
  }

  private async validateParams(): Promise<void> {
    try {
      if (!this.name || this.name.trim() === '') {
        throw new Error('Category name is required');
      }

      const exist = await this.categoryRepository.findOne({ 
        where: { name: this.name } 
      });
      
      if (exist) {
        throw new Error(`Category name "${this.name}" already exists.`);
      }

    } catch (error) {
      console.log('ERROR validateParams', error?.message);
      throw error instanceof Error ? error : new Error(error?.message);
    }
  }
}