import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');
  private readonly baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  constructor() {
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  getUploadedFileUrl(filename: string): string {
    return `${this.baseUrl}/uploads/${filename}`;
  }
}