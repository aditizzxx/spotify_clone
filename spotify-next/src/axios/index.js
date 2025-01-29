import axios from "axios";
import { API_URL, BASE_URL } from "./config";
// import {
//   ApiResponseStatus,
//   ACCESS_TOKEN,
//   REFRESH_TOKEN,
//   Event,
// } from "../utils/constants";
import message from "src/utils/messages";

const getLocalAccessToken = async () => {
  // const accessToken = await sessionStorage.getItem(ACCESS_TOKEN);
  // return accessToken;
  const session = window.localStorage.getItem("session")
  // console.log('accessToken',session);
  if (session !== "undefined") {
    const accessToken = JSON.parse(session)?.token;
    return accessToken;
  } else {
    return null;
  }
};

const getLocalRefreshToken = async () => {
  const refreshToken = await sessionStorage.getItem(REFRESH_TOKEN);
  return refreshToken;
};

const instance = axios.create({
  baseURI: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    AccessControlAllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
  },
});

function sendErrorMessageEvent(message) {
  //console.log("sendErrorMessageEvent ", message);
  // DeviceEventEmitter.emit(Event.SHOW_ERROR_TOAST, {
  //   message, 
  // });
}

/**
 * Request interceptor
 * Add Authorization header if it exists
 * This configuration applies for all requests
 */
instance.interceptors.request.use(
  async (reqConfig) => {
    // console.log(reqConfig);
    // const isInternet = await isInternetConnected();
    //console.log('isInternet')
    //console.log(isInternet)
    // if (!isInternet) {
    //   sendErrorMessageEvent(message.InternetNotAvailable);
    //   return Promise.reject({
    //     response: {
    //       data: {
    //         errors: [
    //           {
    //             status: 111,
    //             message: "Internet is not available",
    //           },
    //         ],
    //       },
    //     },
    //   });
    // }
    // if (reqConfig.url !== `${BASE_URL}${API_URL.REFRESH_TOKEN}`) {
      let accessToken = await getLocalAccessToken();
      if (accessToken && reqConfig.url !== `${BASE_URL}${API_URL.LOGIN}`) {
        reqConfig.headers = {
          ...reqConfig.headers, 
          Authorization: `JWT ${accessToken}`,
        };
      }
    // }
    //console.log("Req", reqConfig);
    return reqConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Catch basic errors like 401 and redirect to login
 * This configuration applies for all responses
 */
instance.interceptors.response.use(
  async (response) => {
//     // const isInternet = await isInternetConnected();
//     // //console.log('isInternet')
//     // //console.log(isInternet)
//     // if (!isInternet) {
//     //   sendErrorMessageEvent(message.InternetNotAvailable);
//     //   return Promise.reject({
//     //     response: {
//     //       data: {
//     //         errors: [
//     //           {
//     //             status: 111,
//     //             message: "Internet is not available",
//     //           },
//     //         ],
//     //       },
//     //     },
//     //   });
//     // } else {

//       // console.log(response);
      if (response.status === 200) {
        return response;
      }
      return Promise.reject({
        message: message.SomethingWentWrong,
      });
    // }
  },
  async (error) => {
//     //console.log("reaq error ", error);
//     // Do something with response error
//     // if (typeof error === 'undefined') {
//     //   // request cancelled
//     //   // when backend server is not available at all

//     //   let serverError = {
//     //     data: {
//     //       message: Messages.serverError,
//     //     },
//     //   };
//     //   showSnackBar(Messages.serverError);
//     //   return Promise.reject(serverError);
//     // } else if (typeof error.response === 'undefined') {
//     //   // when request is timeout
//     //   let serverError = {
//     //     data: {
//     //       message: Messages.serverError,
//     //     },
//     //   };
//     //   showSnackBar(Messages.serverError);
//     //   return Promise.reject(serverError);
//     // } else if (error.response.status === 401) {
//     //   // apply refresh token logic here instead of redirecting to login
//     //   //localStorage.clear();
//     //   //sessionStorage.clear();

//     //   if (error.response.data.meta)
//     //     showSnackBar(error.response.data.meta.message);
//     // } else if (error.response.status === 111) {
//     //   // internet not connected

//     //   showSnackBar(error.response.message);
//     // } else {
//     //   if (error.response.data.meta)
//     //     showSnackBar(error.response.data.meta.message);
//     // }
//     // const isInternet = await isInternetConnected();
//     //console.log('isInternet')
//     //console.log(isInternet)
//     if (!isInternet) {
//       sendErrorMessageEvent(message.InternetNotAvailable);
//       return Promise.reject({
//         response: {
//           data: {
//             errors: [
//               {
//                 status: 111,
//                 message: "Internet is not available",
//               },
//             ],
//           },
//         },
//       });
//     }
    if (error.response) {
//       // Access Token was expired
      if (
        error.response.status === 401 &&
        error.config.url !== `${BASE_URL}${API_URL.LOGIN}`
      ) {
//         if (error.config.url === `${BASE_URL}${API_URL.REFRESH_TOKEN}`) {
//           // DeviceEventEmitter.emit(Event.SESSION_EXPIRED);
//           return Promise.reject({
//             message: message.SomethingWentWrong,
//           });
//         } else {
//           try {
//             const rs = await refreshToken();
//             if (rs.data) {
//               const { access_token, refresh_token } = rs.data;
//               await sessionStorage.setItem(ACCESS_TOKEN, access_token);
//               await sessionStorage.setItem(REFRESH_TOKEN, refresh_token);
//               return instance(error.config);
//             } else {
//               // DeviceEventEmitter.emit(Event.SESSION_EXPIRED);
//               return Promise.reject({
//                 message: message.SomethingWentWrong,
//               });
//             }
//           } catch (_error) {
//             if (_error.response) {
//               return Promise.reject(error.response);
//             }
//             return Promise.reject(_error);
//           }
//         }
//       } else {
        sendErrorMessageEvent(message.SomethingWentWrong);
        return Promise.reject({
          message: message.SomethingWentWrong,
        });
      }
    } else {
      if(error.name == 'AxiosError') {
        sendErrorMessageEvent(message.ApiConnectionTimeout);
        return Promise.reject({
          message: message.ApiConnectionTimeout,
        });
      } else {
        sendErrorMessageEvent(message.SomethingWentWrong);
//         return Promise.reject({
//           message: message.SomethingWentWrong,
        // });
      }
    }
  }
);

const refreshToken = async () => {
  const refresh_token = await getLocalRefreshToken();
  return instance.post(`${BASE_URL}${API_URL.REFRESH_TOKEN}`, {
    refresh_token,
  });
};

export default instance;
