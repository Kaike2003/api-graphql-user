import { PrismaClient } from "@prisma/client";
import { IQueryRepositoryUser } from "../interface/repository/query.repository.user";
import { User } from "../interface";
import { DataSource } from "apollo-datasource";

export class RepositoryQueryUser extends DataSource {
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new RepositoryQueryUser(prisma);
  }

  public async user(data: { email: string }): Promise<User> {
    const user: User = {
      id: "1",
      email: "",
      age: 20,
      name: "",
    };

    return user;
  }

  public async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
