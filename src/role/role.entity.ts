export default class Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<Role>) {
    Object.assign(this, data);
  }
}
