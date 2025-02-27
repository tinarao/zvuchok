export const BASIC_API_URL = "http://localhost:5129/api" as const;

export type ActionResult = {
    ok: boolean,
    message?: string
}