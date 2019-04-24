import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import privateResolver from "../../../utils/privateResolver";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(async (_, __, { req }) => {
      const user: User = req.user;
      if (user.email) {
        try {
          const oldVerification = await Verification.findOne({
            payload: user.email
          });
          if(oldVerification) {
            oldVerification.remove();
          }
          const newVerification: Verification = await Verification.create({
            payload: user.email,
            target: "EMAIL"
          }).save();
          if(newVerification) {
            await sendVerificationEmail(user.fullName, newVerification.key);
          }
          return {
            ok: true,
            error: null
          };
        } catch(error) {
          return {
            ok: false,
            error: error.message
          }
        }
      } else {
        return {
          ok: false,
          error: "not found the email to verify"
        };
      }
    })
  }
};

export default resolvers;