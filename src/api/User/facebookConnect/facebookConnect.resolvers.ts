import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from '../../../entities/User';
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _, 
      args: FacebookConnectMutationArgs
    ) : Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const exitingUser = await User.findOne({ fbId });
        if(exitingUser) {
          const token = createJWT(exitingUser.id);
          return {
            ok: true,
            error: null,
            token
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
      try {
        const user = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        const token = createJWT(user.id);
        return {
          ok: true,
          error: null,
          token
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers;