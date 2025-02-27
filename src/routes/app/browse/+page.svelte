<script lang="ts">
  import Header from "@/lib/components/containers/header.svelte";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  const { data } = $props();
</script>

<div class="h-screen flex flex-col">
  <Header />
  <main class="grid grid-cols-4 flex-1">
    <div class="col-span-1 p-1">
      <div class="bg-neutral-100 h-full rounded-md"></div>
    </div>
    <div class="col-span-3 h-full p-1 rounded-md">
      <div class="h-full p-2">
        {#await data.samples}
          <div class="h-full flex items-center justify-center">
            <LoaderCircle class="size-4 animate-spin" />
          </div>
        {:then samples}
          <p>Всего: {samples.length}</p>
          {#each samples as sample}
            <div>{sample.name}</div>
          {/each}
        {/await}
      </div>
    </div>
  </main>
</div>
