import convict from "convict";

const schema = {
  app: {
    name: {
      doc: 'Icury EOS Service',
      format: String,
      default: 'Icury EOS Service'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: "node_env"
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  port: {
    doc: "The port exposed for server",
    format: Number,
    default: 5000,
    env: "PORT",
    arg: "port"
  },
  eosBaseUrl: {
    doc: "Contains baseUrl for BTS third party api",
    format: String,
    default: "http://localhost:8888",
    env: "EOS_BASE_URL",
    arg: "eos_base_url"
  },
};

const envConfig = convict(schema);
envConfig.validate({ allowed: "strict" });

export default envConfig;
