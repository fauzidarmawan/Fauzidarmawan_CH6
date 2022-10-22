const express = require("express");
const controllers = require("../app/controllers");
const swaggerUI = require("swagger-ui-express");
const swgDoc = require("../docs/openapi.json");
const appRouter = express.Router();
const apiRouter = express.Router();

appRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc));


/** Mount GET / handler */
appRouter.get("/", controllers.main.index);
apiRouter.post("/api/v1/tadmin", 
    controllers.api.v1.auth.authorizeSAdn, 
    controllers.api.v1.auth.buatadmin
);
apiRouter.get("/api/v1/whoAmi", controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoAmI
);
apiRouter.get("/api/v1/cars", 
    controllers.api.v1.auth.authorizeAdn, 
    controllers.api.v1.car.list
);

apiRouter.post("/api/v1/cars", 
    controllers.api.v1.auth.authorizeAdn, 
    controllers.api.v1.car.create
);
apiRouter.put(
    "/api/v1/cars/:id",
    controllers.api.v1.auth.authorizeAdn,
    controllers.api.v1.car.update
);
apiRouter.get(
    "/api/v1/cars/:id",controllers.api.v1.auth.authorizeAdn,controllers.api.v1.car.show
);
apiRouter.delete(
    "/api/v1/cars/:id",
    controllers.api.v1.auth.authorizeAdn,
    controllers.api.v1.car.deletedBy,
    controllers.api.v1.car.destroy
);

apiRouter.post("/api/v1/register", controllers.api.v1.auth.register);


apiRouter.post("/api/v1/login", controllers.api.v1.auth.login);

apiRouter.get("/api/v1/users", 
    controllers.api.v1.auth.authorize, 
    controllers.api.v1.auth.semuauser
);


/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race."
    );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
appRouter.get("/errors", () => {
    throw new Error(
        "The Industrial Revolution and its consequences have been a disaster for the human race."
    );
});

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;