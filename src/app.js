const SecretManager = require('./config/secretManager.config');
const Server = require('./server');
const routes = require('./routes');

const secrets = new SecretManager().loadApplicationSecrets();
secrets.then(() => {
    new Server().router(routes).listen();
  }).catch((error) => {
    console.error({ error });
  });
