import { IDataSources } from "../../../config/dataSource/dataSource";
import { User } from "./interface";
import {
  IMutationCreateUser,
  IMutationDeleteUserByEmail,
  IMutationUpdateUser,
  IMutationUpdateUserByEmail,
} from "./interface/repository/mutation.repository.user";
import { IQueryUser } from "./interface/repository/query.repository.user";

export const resolvers = {
  Query: {
    user: async (obj: any, { data }: IQueryUser, context: IDataSources) => {
      return await context.dataSources.repositoryQueryUser.user(data);
    },
    users: async (obj: any, args: any, context: IDataSources) => {
      return await context.dataSources.repositoryQueryUser.users();
    },
  },
  Mutation: {
    async createUser(obj: any, { data }: IMutationCreateUser, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.createUser(data);
    },
    async updateUser(obj: any, { data }: IMutationUpdateUser, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.updateUser(data);
    },
    async updateUserByEmail(obj: any, { data }: IMutationUpdateUserByEmail, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.updateUserByEmail(data);
    },
    async deleteUserByEmail(obj: any, { data }: IMutationDeleteUserByEmail, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.deleteUserByEmail(data);
    },
  },
};
