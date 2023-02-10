import jwt from "jsonwebtoken";

const secret = "chave-do-jwt";
export const jwtService = {
  signToken: (payLoad: string | object | Buffer, expiration: string) => {
    return jwt.sign(payLoad, secret, {
      expiresIn: expiration,
    });
  },
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
