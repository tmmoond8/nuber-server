import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import { abs } from '../../../utils/math';

const resolvers = {
  SubScription: {
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
            abs(pickUpLat - uesrLastLat) <= 0.05 &&
            abs(pickUpLng - userLastLng) <= 0.05
          );
        }
      )
    }
  }
};

export default resolvers;