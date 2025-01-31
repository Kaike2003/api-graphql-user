import { User } from "..";

export interface IMutationRepositoryUser {
  createUser(data: { name: string; email: string; age: number }): Promise<User>;
  updateUser(data: { name: string; age: number }): Promise<User>;
  updateUserByEmail(data: { id: string; email: string }): Promise<User>;
  deleteUserByEmail(data: { email: string }): Promise<User>;
}

export interface IMutationCreateUser {
  data: {
    name: string;
    email: string;
    age: number;
  };
}

export interface IMutationUpdateUser {
  data: {
    email: string;
    name: string;
    age: number;
  };
}

export interface IMutationUpdateUserByEmail {
  data: {
    id: string;
    email: string;
  };
}

export interface IMutationDeleteUserByEmail {
  data: {
    email: string;
  };
}
