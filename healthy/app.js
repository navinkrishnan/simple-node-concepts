const express = require("express");
const cors = require("cors");

class Application {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();

    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use(require("./routes/health.route"));
    }
}

const app = new Application().app;

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);