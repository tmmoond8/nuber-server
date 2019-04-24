import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(async (
      _, 
      args : EditPlaceMutationArgs, 
      { req }
    ) : Promise<EditPlaceResponse> => {
      const user: User = req.user;
      try {
        const place = await Place.findOne({id: args.placeId});
        if(place) {
          if(place.userId === user.id) {
            const notNull = cleanNullArgs(args);
            await Place.update({ id: args.placeId }, { ...notNull });
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: 'Not Authorized'
            }
          }
        } else {
          return {
            ok: false,
            error: 'Place not found'
          }
        }
      } catch (error) {
        return {
          ok: true,
          error: error.message
        }
      }
    })
  }
}

export default resolvers;