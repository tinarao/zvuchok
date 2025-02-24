class Service {
  private static _instance: Service;

  public BASIC_API_URL = "http://localhost:3000";

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async getAllSamples() {}

  public async getSampleById(id: number) {}
}

export const sampleService = Service.Instance;
