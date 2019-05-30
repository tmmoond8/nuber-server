import { GetNearbyRideResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { Between, getRepository } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
      const user: User = req.user;
      if(user.isDriving) {
        const { lastLat, lastLng } = user;
        try {
          const ride = await getRepository(Ride).findOne({
            status: "REQUESTING",
            pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
            pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
          },
          { relations: ["passenger"]}
          );
          return {
            ok: true,
            error: null,
            ride: ride || null
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          }
        }
      } else {
        return {
          ok: false,
          error: 'You are not a driver',
          ride: null
        }
      }
    })
  }
}

export default resolvers;