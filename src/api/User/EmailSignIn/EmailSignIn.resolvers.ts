import { EmailSignInMutationArgs, EmailSignInResponse } from 'src/types/graph';
import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async(_, args: EmailSignInMutationArgs) :Promise<EmailSignInResponse> => {
      try {
        const { email } = args;
        const user =  User.findOne({ email });
        if(!user) {
          return {
            ok: false,
            error: "No User found with that email",
            token: null
          }
        } else {
          return {
            ok: true,
            error: 'temp',
            token: ''
          }
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