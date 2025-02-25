<script>
  import { open } from "@tauri-apps/plugin-dialog";
  import { Button } from "@/lib/components/ui/button";
  import { invoke } from "@tauri-apps/api/core";

  let isProcessing = $state(false);

  const handleSelectFile = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    });

    isProcessing = true;
    try {
      console.time("analyze_track");
      const result = await invoke("analyze_track", { path: file });
      console.timeEnd("analyze_track");
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      isProcessing = false;
    }
  };
</script>

<div>
  <Button onclick={handleSelectFile}>Выбрать</Button>
  {#if isProcessing}
    <p>Анализируем...</p>
  {/if}
</div>
