export class User {
  name: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  resetToken?: string | null;


  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
