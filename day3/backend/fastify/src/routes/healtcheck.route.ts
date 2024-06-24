const routes = async (app: any, options: any) => {
  app.route({
    method: "GET",
    url: "/_/healthcheck",
    handler: async (req: any, res: any) => {
      try {
        return res
          .status(200)
          .send({ app: true, db: await app.healtcheckService.healthcheck() });
      } catch (error: any) {
        return res.status(500).send({ app: false, db: false });
      }
    },
  });
};

export default routes;
