export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
