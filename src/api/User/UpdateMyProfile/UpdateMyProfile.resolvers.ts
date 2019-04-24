import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args, { req }) => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        if(notNull.password) {
          user.password = notNull.password;
          user.save();
          delete notNull.password;
        }

        try {
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          }
        }
      }
    )
  }
};

export default resolvers;