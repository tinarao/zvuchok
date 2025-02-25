<script>
  import { Button } from "../ui/button";
  import Upload from "lucide-svelte/icons/upload";
</script>

<header class="py-2 bg-black/50 px-8 flex items-center justify-between text-white">
  <h1 class="text-white">Звучок</h1>
    <Button href="/app/submit">
      <Upload class="size-4 mr-2" /> Загрузить
    </Button>
</header>
