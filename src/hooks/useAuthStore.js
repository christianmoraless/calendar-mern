import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch;

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("auth/", { email, password });
      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      //   dispatch(onLogout());
    }
  };

  return {
    //properties
    errorMessage,
    status,
    user,
    // methods
    startLogin,
  };
};
