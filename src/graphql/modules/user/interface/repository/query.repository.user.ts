import { User } from "..";

export interface IQueryRepositoryUser {
  user(data: { email: string }): Promise<User>;
  users(): Promise<User[]>;
}

export interface IQueryUser {
  data: {
    email: string;
  };
}
