// import { LoginDux } from "./dux/login";
// import { IData } from "../api/api";

// export type UserState = {
//   profile: IData<Api.AdminLoginResult>;
// };

// Define the shape of state - 'routing' is provided via middleware (routerReducer from 'react-router-redux'), 'user' by our reducers!
export type State = {
  // user: UserState;
  routing: { locationBeforeTransitions: { pathname: string; search: string } };
};
