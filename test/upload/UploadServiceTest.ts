import { UploadService } from '../../src/upload/upload.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('UploadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crée le dossier upload si inexistant', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    new UploadService();
    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.mkdirSync).toHaveBeenCalled();
  });

  it('ne crée pas le dossier upload si déjà existant', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    new UploadService();
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it('retourne la bonne URL du fichier uploadé', () => {
    const service = new UploadService();
    const url = service.getUploadedFileUrl('test.png');
    expect(url).toMatch(/\/uploads\/test\.png$/);
  });
});