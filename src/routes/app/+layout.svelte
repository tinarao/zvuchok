<script>
  import { goto } from "$app/navigation";
  import { authService } from "@/lib/api/authService";
  import Header from "@/lib/components/containers/header.svelte";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(async () => {
    const isAuthenticated = await authService.authenticate();
    if (isAuthenticated) {
      goto("/login");
    }
  });
</script>

<div class="h-screen flex flex-col">
  <Header />
  <main class="grid grid-cols-4 flex-1">
    <div class="col-span-1 bg-neutral-200"></div>
    <div class="col-span-3 h-full">
      {@render children()}
    </div>
  </main>
</div>
