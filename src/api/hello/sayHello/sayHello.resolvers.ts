import { SayHelloQueryArgs, SayHelloResponse } from "src/types/graph";

// 모든 resolver는  parent, args, context를 전달받게 되어 있다.
// 우리가 필요한 것은 args뿐이므로 parent는 _로 적어준다.(_는 사용하지 않음으로 암묵적으로 의미한다.)
const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs) : SayHelloResponse => {
      return {
        error: true,
        text: `hello ${args.name}`
      }
    }
  }
}

export default resolvers;