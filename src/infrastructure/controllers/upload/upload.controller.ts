import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { AttachmentUsecasesProxyModule } from '../../usecases-proxy/attachment-usecases-proxy.module';
import { CreateAttachmentUseCase } from '../../../usecases/attachment/createAttachment.usecase';

const uploadDir = join(process.cwd(), 'uploads');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(AttachmentUsecasesProxyModule.CREATE_ATTACHMENT_PROXY)
    private readonly createAttachmentUseCase: CreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { ownerId?: string; ownerType?: string; originalName?: string; uploadType?: string },
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('ขนาดไฟล์ต้องไม่เกิน 5MB');
    }

    const fileUrl = `/uploads/${file.filename}`;
    const ownerId = body.ownerId || 'unassigned';
    const ownerType = body.ownerType || 'general';
    const originalName = body.originalName || file.originalname;
    const uploadType = body.uploadType || (file.mimetype.startsWith('image/') ? 'image' : 'pdf');

    const attachment = await this.createAttachmentUseCase.execute({
      ownerId,
      ownerType,
      originalName,
      fileName: file.filename,
      fileUrl,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadType,
      status: 'completed' as any,
    });

    return {
      success: true,
      url: fileUrl,
      fileUrl: fileUrl,
      downloadUrl: fileUrl,
      file: {
        _id: attachment._id,
        fileName: file.filename,
        filePath: fileUrl,
        originalName,
      },
      attachment,
    };
  }
}
