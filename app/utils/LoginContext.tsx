import React, { useContext } from "react";

const LoginContext = React.createContext<string | null>(null);

export function useLogin() {
  return useContext(LoginContext);
}

export default LoginContext;
