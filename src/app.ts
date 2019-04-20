import { GraphQLServer } from 'graphql-yoga';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema
    });
    this.middlewares();
  }
  
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
  };

  private jwt = async (req, res, next) : Promise<void> => {
    const token = req.get("X-JWT");
    if(token) {
      // 토큰에서 사용자의 아이디를 꺼냄
    }
  }
}

export default new App().app;