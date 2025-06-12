export class Information {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<Information>) {
    Object.assign(this, data);
  }
}
