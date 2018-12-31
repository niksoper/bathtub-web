// import { call, put, takeEvery } from "redux-saga/effects";
// import { Reducer } from "redux";
// import { ActionsFactory } from "../core/actionsFactory";
// import { hashHistory } from "react-router";
// import { IData, apiFactory } from "../../api/api";
// import { ILoginRequest } from "../../typings/app";
// import { IFetchApiResponse } from '../../api/client-api';

// export namespace LoginDux {
//   const dux = ActionsFactory.create(actionType => {
//     return {
//       logoutTry: actionType<{}>(),

//       loginTry: actionType<{ data: ILoginRequest; returnUrl?: string }>(),
//       loginSuccess: actionType<{ data: Api.AdminLoginResult }>(),
//       loginFailure: actionType<{ error: any }>()
//     };
//   });

//   export const actions = dux.creatorsFor({
//     login: "loginTry",
//     logout: "logoutTry"
//   });

//   function getInitialState() {
//     // Check localstorage for token. If we have it, rebuild response state.
//     let accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       return { status: "loaded", data: { accessToken } } as any;
//     }
//     return {};
//   }

//   export const reducer = (state: IData<Api.AdminLoginResult> = getInitialState(), action: typeof dux.actionTypes.ref): IData<Api.AdminLoginResult> => {
//     switch (action.type) {
//       case dux.actions.loginTry.type:
//         return { status: "loading" };
//       case dux.actions.loginFailure.type:
//         return { status: "error", error: action.error };
//       case dux.actions.loginSuccess.type:
//         return { status: "loaded", data: action.data };
//       default:
//         return state;
//     }
//   };

//   function* loginSaga(action: typeof dux.actions.loginTry.typeRef) {
//     try {
//       const credentials: Api.LoginRequest = {
//         email: action.data.username,
//         password: action.data.password,
//       }

//       const r: IFetchApiResponse<Api.AdminLoginResult> = yield call(() => apiFactory.auth.adminLogin(credentials))
//       if (r.failure) {
//         yield put(dux.actions.loginFailure.create({ error: r.failure.text }))
//         return
//       }

//       yield put(dux.actions.loginSuccess.create({ data: r.payload }));
//       hashHistory.replace(action.returnUrl || "/");
//     } catch (e) {
//       console.error(e);
//       yield put(dux.actions.loginFailure.create({ error: e.response.data.error }));
//     }
//   }

//   function* logoutSaga(action: typeof dux.actions.logoutTry.typeRef) {
//     yield call(() => apiFactory.auth.logout())

//     yield localStorage.removeItem("accessToken");
//     yield put({ type: "RESET-USER-DATA" });
//     hashHistory.push("/login");
//   }

//   export function* saga() {
//     yield takeEvery(dux.actions.loginTry.type, loginSaga);
//     yield takeEvery(dux.actions.logoutTry.type, logoutSaga);
//   }
// }
