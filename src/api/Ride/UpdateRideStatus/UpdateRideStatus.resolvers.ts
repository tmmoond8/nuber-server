import Ride from "src/entities/Ride";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _, 
        args: UpdateRideStatusMutationArgs, 
        { req }
      ) : Promise<UpdateRideStatusResponse> => {
          const user: User = req.user;
          if(user.isDriving) {
            try {
              const ride = await Ride.findOne({
                id: args.rideId,
                status: "REQUESTING"
              });
              if(ride) {
                ride.status = "ACCEPTED";
                ride.save();
              } else {
                return {
                  ok: false,
                  error: "Can't found Ride"
                }
              }
            } catch(error) {
              return {
                ok: false,
                error: error.message
              }
            }
           } else {
             return {
               ok: false,
               error: "User is Not on driving"
             }
           }
        }
    )
  }
}

export default resolvers;