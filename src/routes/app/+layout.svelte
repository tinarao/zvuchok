<script>
  import { goto } from "$app/navigation";
  import { authService } from "@/lib/api/authService";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(async () => {
    const isAuthenticated = await authService.authenticate();
    if (!isAuthenticated) {
      goto("/login");
    }
  });
</script>

{@render children()}
