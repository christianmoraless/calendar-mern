import axios from "axios";
import { getEnvVariables } from "../helpers";

const { vITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: vITE_API_URL,
});

export default calendarApi;
