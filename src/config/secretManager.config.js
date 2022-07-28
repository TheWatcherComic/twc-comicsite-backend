const AWS = require('aws-sdk');
const { json } = require('body-parser');
const client = new AWS.SecretsManager({ region: "us-east-1" });
const fs = require('fs');
class SecretManager {
    async loadApplicationSecrets() {
        const secretId = "twc-prod";
        const ApplicationSecrets = JSON.parse(await this.getMySecret(secretId));
        const JsonString = await this.convertToEnv(ApplicationSecrets)
		fs.writeFile('.env', JsonString, function(err, result) {
            if(err) console.log('error', err);
          });
    }
    async getMySecret(SecretId) {
        const s = await client.getSecretValue({ SecretId }).promise();
        return s.SecretString;
    }

    async convertToEnv (object) {
        let envFile = ''
        for (const key of Object.keys(object)) {
            envFile += `${key}=${object[key]}\n`
        }
        return envFile
    }

}

module.exports = SecretManager;