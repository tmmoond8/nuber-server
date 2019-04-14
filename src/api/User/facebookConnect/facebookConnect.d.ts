import { Resolvers } from "src/types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import User from "src/entities/User";

const resolvers: Resolvers = {
  Mutation: {
    FaceBookConnect: async (
      _, 
      args: FacebookConnectMutationArgs
    ) : Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const exitingUser = User.findOne({ fbId })
        if(exitingUser) {
          return {
            ok: true,
            error: null,
            token: 'Comming Soon'
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
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square'`
        }).save();
        return {
          ok: true,
          error: null,
          token: "Comming soon"
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