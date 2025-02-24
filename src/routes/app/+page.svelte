<script>
  import { sampleService } from "@/lib/api/service";
  import { onMount } from "svelte";

  onMount(async () => {
    const response = await sampleService.getAllSamples();
  });
</script>
