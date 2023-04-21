import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const { status, user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", data.uid);
      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      dispatch(onLogout("Credenciales Incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    error,
    status,
    user,
    startLogin,
  };
};
