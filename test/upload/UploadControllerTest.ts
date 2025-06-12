import { UploadController } from '../../src/upload/upload.controller';
import { UploadService } from '../../src/upload/upload.service';

describe('UploadController', () => {
  let controller: UploadController;
  let service: UploadService;

  beforeEach(() => {
    service = {
      getUploadedFileUrl: jest.fn().mockReturnValue('http://localhost:3000/uploads/test.png'),
    } as any;
    controller = new UploadController(service);
  });

  it('uploadImage retourne le message et l\'URL', () => {
    const file = { filename: 'test.png' } as any;
    const result = controller.uploadImage(file);
    expect(result).toEqual({
      message: 'Fichier uploadé avec succès',
      url: 'http://localhost:3000/uploads/test.png',
    });
    expect(service.getUploadedFileUrl).toHaveBeenCalledWith('test.png');
  });
});