import { prisma } from "../../db/prisma";
import { IMutationRepositoryUser } from "../../graphql/modules/user/interface/repository/mutation.repository.user";
import { IQueryRepositoryUser } from "../../graphql/modules/user/interface/repository/query.repository.user";
import { RepositoryMutationUser } from "../../graphql/modules/user/repository/repository.mutation.user";
import { RepositoryQueryUser } from "../../graphql/modules/user/repository/repository.query.user";

export interface IDataSources {
  dataSources: {
    repositoryMutationUser: IMutationRepositoryUser;
    repositoryQueryUser: IQueryRepositoryUser;
  };
}

export const dataSources = () => ({
  repositoryMutationUser: RepositoryMutationUser.create(prisma),
  repositoryQueryUser: RepositoryQueryUser.create(prisma),
});
