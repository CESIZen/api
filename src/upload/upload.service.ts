import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');
  // Utiliser l'URL du backend où les fichiers sont réellement servis
  private readonly baseUrl = process.env.BACKEND_URL || 'http://localhost:3000';

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