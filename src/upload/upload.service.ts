import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');
  private readonly baseUrl = process.env.BACKEND_URL || 'http://ec2-18-204-77-83.compute-1.amazonaws.com:3000';

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