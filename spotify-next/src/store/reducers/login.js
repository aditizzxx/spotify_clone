import { ACCESS_TOKEN, user } from "src/utils/constants";
import * as actionTypes from "../actionTypes";
import { signIn } from "next-auth/react";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_FETCH_LOGIN_DETAILS_WATCHER:
      return initialState;
    case actionTypes.FETCH_LOGIN_DETAILS_ACTION:
      return {
        ...state,
        isLoading: true,
        data: null,
        error: null,
      };
    case actionTypes.LOGIN_DETAILS_ACTION_SUCCESS:
      console.log(action.payload);
      // if (action.payload) {
      //     try {
      //         localStorage.setItem(ACCESS_TOKEN, action?.payload?.data?.token);
      //         localStorage.setItem(user,action?.payload?.data?.user?.user);
      //     } catch (e) {
      //         // save error
      //         // console.log("errr0rrr ===> ", e);
      //     }
      // }

      if (action.payload) {
        try {
          const token = action.payload.data;
          window.localStorage.setItem(
            "session",
            JSON.stringify(action.payload.data)
          );

          const loginFxn = async () => {
            const res = await signIn("credentials", {
              id: token.user.id,
              email: token.user.user,
              name: token.user.name,
              img:token.user.img,
              _id: token.user._id,
              role: token.user.role,
              token: token.user.token,
              redirect: true,
            });
            return res;
          };

          if (token) {
            loginFxn();
          }
        } catch (e) {
          // save error
        }
      }
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.LOGIN_DETAILS_ACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
