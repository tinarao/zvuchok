import axios from "axios";
import type { Sample } from "../types/samples";
import { BASIC_API_URL } from "./apiConfig";

class SampleService {
  private static _instance: SampleService;

  public SAMPLE_BASE_API_ROUTE = BASIC_API_URL + "/sample";

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
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
