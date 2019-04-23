import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(async (_, __, { req }) => {
      const user: User = req.user;
      user.isDriving = !user.isDriving;
      user.save();
      return {
        ok: true,
        error: null
      }
    })
  }
}

export default resolvers;