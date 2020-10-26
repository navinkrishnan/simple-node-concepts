const fs = require("fs");
const packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));

class HealthService {
    get(){
        try {
            return {
                health: true,
                version: packageJson.version
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new HealthService();