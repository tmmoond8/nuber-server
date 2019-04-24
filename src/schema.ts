// import { GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-middleware/dist/types';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

// 현재 디렉토리 api 하위에 .graphql을 확장자로 갖는 모든 파일을 가져옴. fileLoader가 이런 작업을 처리한다.
// 강의와 다르게 타입을 수정함 GraphQLSchema[] -> string[]
const allTypes: string[] = fileLoader(
  path.join(__dirname, "./api/**/*.graphql")
);

// ts파일은 배포용으로 빌드하면 js로 떨어지므로
// 강의와 다르게 타입을 수정함 string[] -> IResolvers[]
const allResolvers: IResolvers[] = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;