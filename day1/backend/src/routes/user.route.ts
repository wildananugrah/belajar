const routes = async (app: any, options: any) => {
  app.route({
    method: "POST",
    url: "/user/login",
    handler: async (req: any, res: any) => {
      const { username, password } = req.body;
      return app.user.login(username, password);
    },
  });

  app.route({
    method: "POST",
    url: "/user/register",
    handler: async (req: any, res: any) => {
      const { username, password } = req.body;
      try {
        return app.user.register(username, password);
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    },
  });
};

export default routes;
