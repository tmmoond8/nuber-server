import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, context ) => {
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { drvierId, passengerId }
          } = payload;
          return user.id === drvierId || user.id === passengerId;
        }
      )
    }
  }
}

export default resolvers;