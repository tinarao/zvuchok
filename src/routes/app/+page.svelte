<script>
  import { sampleService } from "@/lib/api/sampleService";
  import { onMount } from "svelte";

  onMount(async () => {
    const samples = await sampleService.getAllSamples();
  });
</script>

<div>samples</div>
