import axios from "axios";
import type { Sample } from "../types/samples";
import { BASIC_API_URL, type ActionResult } from "./apiConfig";
import type { CreateSampleDTO } from "../validations/sample";
import { authService } from "./authService";

class SampleService {
  private static _instance: SampleService;

  public SAMPLE_BASE_API_ROUTE = BASIC_API_URL + "/sample";

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async create(dto: CreateSampleDTO): Promise<ActionResult & { sample?: Sample }> {
    const token = await authService.getToken();
    if (!token) {
      return { ok: false }
    }
    
    const response = await axios.postForm<Sample>(this.SAMPLE_BASE_API_ROUTE, dto, {
      validateStatus: () => true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 

    if (response.status !== 201) {
      return { ok: false, message: "Failed to create sample" };
    }

    return { ok: true, sample: response.data };
  }

  public async getAllSamples(): Promise<Sample[]> {
    const route = this.SAMPLE_BASE_API_ROUTE;
    const response = await axios.get<Sample[]>(route, {
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      return [];
    }

    return response.data;
  }

  public async getSampleById(id: number) {}
}

export const sampleService = SampleService.Instance;
