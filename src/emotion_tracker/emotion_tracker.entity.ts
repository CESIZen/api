export class EmotionTracker {
  id: number;
  userId: number;
  emotionId: number;
  intensity: number;
  note: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<EmotionTracker>) {
    Object.assign(this, data);
  }
}