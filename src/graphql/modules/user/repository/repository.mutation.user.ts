import { PrismaClient } from "@prisma/client";
import { User } from "../interface";
import { DataSource } from "apollo-datasource";
import { createUserSchema, TCreateUserSchema } from "../../validation/user.validation";
import { UserExistedError } from "../../../../errors/UserExistedError";

export class RepositoryMutationUser extends DataSource {
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new RepositoryMutationUser(prisma);
  }

  public async createUser(data: { name: string; email: string; age: number }): Promise<User> {
    try {
      return await createUserSchema
        .parseAsync(data)
        .then(async (res) => {
          const existedUser = await this.prisma.user.findUnique({ where: { email: res.email } });

          if (existedUser) {
            throw new UserExistedError("Email is already in use.");
          }

          const user = await this.prisma.user.create({
            data: res,
          });
          return user;
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }
  public async deleteUserByEmail(data: { email: string }): Promise<User> {
    const user: User = {
      id: "1",
      email: "",
      age: 20,
      name: "",
    };

    return user;
  }
  public async updateUser(data: { name: string; age: number }): Promise<User> {
    const user: User = {
      id: "1",
      email: "",
      age: 20,
      name: "",
    };

    return user;
  }
  public async updateUserByEmail(data: { id: string; email: string }): Promise<User> {
    const user: User = {
      id: "1",
      email: "",
      age: 20,
      name: "",
    };

    return user;
  }
}
