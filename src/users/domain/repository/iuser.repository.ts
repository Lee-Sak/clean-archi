import { User } from '../user';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>;
  save: (
    id: number,
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) => Promise<void>;
}
