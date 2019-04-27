import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideRequest'),
        (payload, _, { currentUser }) => {
          const user: User = currentUser;
          const {
            NearbyRideSubscription: { pickUpLat, pickUpLng }
          } = payload;
          const { lastLat: uesrLastLat, lastLng: userLastLng } = user;
          return (
            Math.abs(pickUpLat - uesrLastLat) <= 0.05 &&
            Math.abs(pickUpLng - userLastLng) <= 0.05
          );
        }
      )
    }
  }
};

export default resolvers;