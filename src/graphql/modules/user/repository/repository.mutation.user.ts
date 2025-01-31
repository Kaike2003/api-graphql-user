import { PrismaClient } from "@prisma/client";
import { User } from "../interface";
import { DataSource } from "apollo-datasource";
import { UserExistedError } from "../../../../errors/UserExistedError";
import { UserNotFoundError } from "../../../../errors/UserNotFoundError";
import {
  mutationCreateUserSchema,
  mutationDeleteUserByEmailSchema,
  mutationUpdateUserByEmailSchema,
  mutationUpdateUserSchema,
} from "../validation/user.validation";

export class RepositoryMutationUser extends DataSource {
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new RepositoryMutationUser(prisma);
  }

  public async createUser(data: { name: string; email: string; age: number }): Promise<User> {
    try {
      return await mutationCreateUserSchema
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
    try {
      return await mutationDeleteUserByEmailSchema
        .parseAsync(data)
        .then(async (res) => {
          const existedUser = await this.prisma.user.findUnique({ where: { email: res.email } });

          if (existedUser) {
            const user = await this.prisma.user.delete({ where: { email: existedUser.email } });

            return user;
          }

          throw new UserNotFoundError("User not found");
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }
  public async updateUser(data: { name: string; age: number }): Promise<User> {
    try {
      return await mutationUpdateUserSchema
        .parseAsync(data)
        .then(async (res) => {
          const existedUser = await this.prisma.user.findUnique({ where: { email: res.email } });

          if (existedUser) {
            const user = await this.prisma.user.update({ where: { email: existedUser.email }, data });

            return user;
          }

          throw new UserNotFoundError("User not found");
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      throw new Error(error);
    }
  }
  public async updateUserByEmail(data: { id: string; email: string }): Promise<User> {
    try {
      return await mutationUpdateUserByEmailSchema
        .parseAsync(data)
        .then(async (res) => {
          const existedUser = await this.prisma.user.findUnique({ where: { id: res.id } });

          if (existedUser?.email === res.email) {
            throw new UserExistedError("User already exists");
          }

          const user = await this.prisma.user.update({
            where: { id: res.id },
            data: {
              email: res.email,
            },
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
}
