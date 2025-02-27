<script>
  import { goto } from "$app/navigation";
  import { authService } from "@/lib/api/authService";

  let { children } = $props();

  $effect(() => {
    authService.authenticate().then((ok) => {
      if (!ok) {
        goto("/login");
      }
    });
  });
</script>

{@render children()}
