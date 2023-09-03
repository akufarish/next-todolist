import { useRouter } from "next/navigation";
import { User } from "../utils";
import axios from "./axios";
import useSwal from "./swal";

export default function useAuth() {
  const { accepted, rejected, confirmed } = useSwal();
  const router = useRouter();

  async function login(params: User) {
    try {
      const response = await axios.post("/api/auth/login", params);
      storeToken(response.data.token);
      console.log(response.data);
      accepted(response.data.message);
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        rejected(error.response?.data.message);
      }
    }
  }

  async function register(params: User) {
    try {
      const response = await axios.post("/api/auth/register", params);
      console.log(response.data);
      accepted(response.data.message);
      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        rejected(error.response?.data.message);
      }
    }
  }

  function storeToken(token: string) {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  function removeToken() {
    localStorage.removeItem("access_token");
    axios.defaults.headers.common.Authorization;
  }

  function isLogged() {
    const token = localStorage.getItem("access_token");

    if (token !== null) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }

  async function logout() {
    const response = await confirmed("Apakah anda mau logout?");

    if (response.isConfirmed) {
      try {
        const response = await axios.get("/api/auth/logout");
        console.log(response.data);
        accepted(response.data.message);
        router.push("/auth/login");
        removeToken();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          rejected(error.response?.data.message);
        }
      }
    }
  }

  return {
    login,
    register,
    isLogged,
    logout,
  };
}
