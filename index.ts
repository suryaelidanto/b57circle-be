import express, { Response, Request } from "express";
import dotenv from "dotenv";
import routerV1 from "./src/routes/v1";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./swagger/swagger-output.json";
// import rateLimit from "express-rate-limit";
import { initializeRedisClient } from "./src/libs/redis-client";

dotenv.config();
const port = process.env.PORT || 5000

// contoh per entri
// const limiter = rateLimit({
//    windowMs: 1 * 60 * 1000, // 5 minutes
//    limit: 2, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
//    standardHeaders: true, // add the `RateLimit-*` headers to the response
//    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
// });

// app.use(limiter);

initializeRedisClient().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDoc, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    })
  );

  app.use("/api/v1", routerV1);

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
});
