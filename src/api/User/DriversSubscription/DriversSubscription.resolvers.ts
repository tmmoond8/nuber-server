const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, { pubSub, currentUser }) => {
        console.log(currentUser);
        return pubSub.asyncIterator('driverUpdate');
      }
    }
  }
};

export default resolvers;