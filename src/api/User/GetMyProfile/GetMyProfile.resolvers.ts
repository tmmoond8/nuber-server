import { Resolvers } from "src/types/resolvers";

const resolvers: Resolvers = {
  Query : {
    GetMyProfile: async (_, __, context) => {
      const { req: { user } } = context;
      return {
        ok: true,
        error: null,
        user
      }
    }
  }
}

export default resolvers;