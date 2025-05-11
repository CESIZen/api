export class Category {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
