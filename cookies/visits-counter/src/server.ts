import * as express from "express";
import * as cookieParser from "cookie-parser";
import createCounterSvg from "./create-counter-svg";

async function main() {
  const app = express();
  app.use(cookieParser());
  app.use(express.static("public"));

  const COOKIE_NAME = "visited";

  app.get("/", (_, res) => {
    // serve index.html
    res.sendFile("index.html");
  });

  let count = 0; // store it in a file/DB for persistence
  app.get("/svg", (req, res) => {
    const visited = req.cookies[COOKIE_NAME];
    if (!visited) {
      count++;
      res.cookie(COOKIE_NAME, "yes", {
        httpOnly: true,
        maxAge: 7 * 24 * 3600 * 1000,
      });
    }
    res.setHeader("content-type", "image/svg+xml");
    res.send(createCounterSvg(count));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

main();
