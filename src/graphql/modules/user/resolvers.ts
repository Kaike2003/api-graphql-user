import { IDataSources } from "../../../config/dataSource/dataSource";
import { User } from "./interface";

export const resolvers = {
  Query: {
    user: async (obj: any, args: any, context: IDataSources) => {
      return await context.dataSources.repositoryQueryUser.user(args);
    },
    users: async (obj: any, args: any, context: IDataSources) => {
      return await context.dataSources.repositoryQueryUser.users();
    },
  },
  Mutation: {
    async createUser(obj: any, args: any, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.createUser(args.data);
    },
    async updateUser(obj: any, args: any, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.updateUser(args.data);
    },
    async updateUserByEmail(obj: any, args: any, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.updateUserByEmail(args.data);
    },
    async deleteUserByEmail(obj: any, args: any, context: IDataSources): Promise<User> {
      return await context.dataSources.repositoryMutationUser.deleteUserByEmail(args.data);
    },
  },
};
