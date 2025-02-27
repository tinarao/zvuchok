import axios from "axios";
import type { LoginFormDTO } from "../validations/user";
import { BASIC_API_URL } from "./apiConfig";
import { load } from "@tauri-apps/plugin-store";

class AuthService {
  private static _instance: AuthService;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async authenticate(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) {
        return false;
      }

      const route = BASIC_API_URL + "/auth/verify";
      const response = await axios(route, { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return true;
    } catch {
      return false;
    }
  }

  public async getToken(): Promise<string | null> {
    const store = await load('store.json', { autoSave: false });
    const val = await store.get<{ value: string }>('access_token');
    if (!val) {
      return null;
    }

    return val.value;
  }

  public async login(data: LoginFormDTO) {
    const route = BASIC_API_URL + "/auth/login";
    const response = await axios.post<{ accessToken: string }>(route, data, {
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      return {
        ok: false,
        message: response.data,
      };
    }

    const store = await load('store.json', { autoSave: false });
    await store.set('access_token', { value: response.data.accessToken }); 
    await store.save();

    return {
      ok: true,
      message: response.data,
    };
  }
}

export const authService = AuthService.Instance;
