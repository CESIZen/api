export class EmotionType {
  id: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<EmotionType>) {
    Object.assign(this, data);
  }
}
