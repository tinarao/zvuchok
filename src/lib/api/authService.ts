import axios from "axios";
import type { LoginFormDTO } from "../validations/user";
import { BASIC_API_URL } from "./apiConfig";

class AuthService {
  private static _instance: AuthService;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async authenticate(): Promise<boolean> {
    try {
      const route = BASIC_API_URL + "/auth/verify";
      const response = await axios(route, { withCredentials: true });

      return true;
    } catch {
      return false;
    }
  }

  public async login(data: LoginFormDTO) {
    const route = BASIC_API_URL + "/auth/login";
    const response = await axios.post(route, data, {
      withCredentials: true,
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      return {
        ok: false,
        message: response.data,
      };
    }

    return {
      ok: true,
      message: response.data,
    };
  }
}

export const authService = AuthService.Instance;
