import jwt_decode from "jwt-decode";

export const parseJwt = (token) => {
  const decoded = jwt_decode(token);
  return decoded;
};

export const navigateByRole = (role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "user":
      return "/home";
    case "manager":
      return "/manager";
    default:
      return "/";
  }
};
