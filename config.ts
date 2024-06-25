const config = {
  security: {
    password: {
      pepper: process.env.SECURITY_PASSWORD_PEPPER ?? "pepper",
      keylen: 128,
      iteration: 100000,
      digest: "sha512",
    },
    session: {
      secret: process.env.SECURITY_SESSION_SECRET ?? "secret",
      expiresIn: "2 days",
    },
  },
};

export default config;
