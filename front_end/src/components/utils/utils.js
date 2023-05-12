import jwt_decode from "jwt-decode";

export const parseJwt = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
};
