import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import Chat from "../../../entities/Chat";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _, 
        args: UpdateRideStatusMutationArgs, 
        { req, pubSub }
      ) : Promise<UpdateRideStatusResponse> => {
          const user: User = req.user;
          if(user.isDriving) {
            try {
              let ride: Ride | undefined;
              if(args.status === "ACCEPTED") {
                ride = await Ride.findOne(
                  {
                    id: args.rideId,
                    status: "REQUESTING"
                  }, 
                  { relations: ["passenger", "driver"]}
                );
                if(ride) {
                  ride.driver = user;
                  user.isTaken = true;
                  user.save();
                  const chat = await Chat.create({
                    driver: user,
                    passenger: ride.passenger
                  }).save();
                  ride.chat = chat;
                  ride.chatId = chat.id;
                  ride.save();
                }
              } else {
                ride = await Ride.findOne(
                  {
                    id: args.rideId,
                    driver: user
                  },
                  { relations: ["passenger", "driver"]}
                );
              }
              if(ride) {
                ride.status = args.status
                ride.save();
                pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
                if (args.status === "FINISHED") {
                  await User.update({ id: ride.driverId }, { isTaken: false });
                  await User.update({ id: ride.passengerId }, { isRiding: false });
                }
                return {
                  ok: true,
                  error: null,
                  rideId: ride.id
                }
              } else {
                return {
                  ok: false,
                  error: "Can't found Ride",
                  rideId: null
                }
              }
            } catch(error) {
              return {
                ok: false,
                error: error.message,
                rideId: null
              }
            }
          } else {
            return {
              ok: false,
              error: "User is Not on driving",
              rideId: null
            }
          }
      }
    )
  }
}

export default resolvers;