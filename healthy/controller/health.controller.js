const healthService = require("../services/health.service");

class HealthController {
    get(_, res) {
      try {
        const healthCheck = healthService.get();
        return res.status(200).json(healthCheck);
      } catch (ex) {
        console.error("Error", ex);
        return res.status(501).json({
          msg: "Error on doing the health check, please try out latter"
        });
      }
    }
  }
  
  module.exports = new HealthController();