import envConfig from "../../config/envConfig";
import * as express from "./express";
import logger from './logger'

const start = async () => {
  const port = envConfig.get("port");

  const appStartMessage = () => {
    const env = process.env.NODE_ENV
    logger.debug(`Initializing API`)
    logger.info(`Server Name : ${envConfig.get('app.name')}`)
    logger.info(`Environment : ${envConfig.get('env')}`)
    logger.info(`App Port : ${port}`)
    logger.info(`Process Id : ${process.pid}`)
  }

  const app = express.init();
  app.listen(port, appStartMessage());
};

export default start;
