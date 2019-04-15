import { Resolvers } from "src/types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import User from '../../../entities/User';

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
          return {
            ok: true,
            error: null,
            token: 'Comming Soon, exiting'
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
        console.log('create user');
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        return {
          ok: true,
          error: null,
          token: "Comming soon, create"
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