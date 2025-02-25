<script>
  import { Toaster } from "svelte-french-toast";
  import "../main.css";

  let { children } = $props();
</script>

{@render children()}
<Toaster position="bottom-right" />
