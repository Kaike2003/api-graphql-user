import { PrismaClient } from "@prisma/client";
import { User } from "../interface";
import { DataSource } from "apollo-datasource";
import { UserNotFoundError } from "../../../../errors/UserNotFoundError";
import { queryUserSchema } from "../validation/user.validation";

export class RepositoryQueryUser extends DataSource {
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new RepositoryQueryUser(prisma);
  }

  public async user(data: { email: string }): Promise<User> {
    try {
      return await queryUserSchema
        .parseAsync(data)
        .then(async (res) => {
          const existedUser = await this.prisma.user.findUnique({ where: { email: res.email } });

          if (existedUser) {
            return existedUser;
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

  public async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
