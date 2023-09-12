import service from "./service";

export const resolvers = {
  Mutation: {
    writeJsonFile: async (
      root: any,
      args: { path?: string; jsonString: string }
    ) => {
      try {
        return await service.writeFile(args);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Query: {
    test: () => {
      return "success";
    },
  },
};
