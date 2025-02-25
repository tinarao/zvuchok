<script lang="ts">
  import Header from "@/lib/components/containers/header.svelte";

  import { sampleService } from "@/lib/api/sampleService";
  import { onMount } from "svelte";
  import type { Sample } from "@/lib/types/samples";

  let samples = $state<Sample[]>([]);

  onMount(async () => {
    samples = await sampleService.getAllSamples();
  });
</script>

<div class="h-screen flex flex-col">
  <Header />
  <main class="grid grid-cols-4 flex-1">
    <div class="col-span-1 p-1">
      <div class="bg-neutral-100 h-full rounded-md"></div>
    </div>
    <div class="col-span-3 h-full p-1 rounded-md">
      <div class="h-full p-2">
        <p>Всего: {samples.length}</p>
        {#each samples as sample}
          <div>{sample.name}</div>
        {/each}
      </div>
    </div>
  </main>
</div>
