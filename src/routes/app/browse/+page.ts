import { sampleService } from "@/lib/api/sampleService";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    return {
        samples: sampleService.getAllSamples()
    }
}