<script lang="ts">
  import { open } from "@tauri-apps/plugin-dialog";
  import { Button } from "@/lib/components/ui/button";
  import { invoke } from "@tauri-apps/api/core";
  import { readFile } from "@tauri-apps/plugin-fs";
  import type { CreateSampleDTO } from "@/lib/validations/sample";
  import { sampleService } from "@/lib/api/sampleService";

  let isProcessing = $state(false);

  const handleSelectFile = async () => {
    const filepath = await open({
      multiple: false,
      directory: false,
    });

    if (!filepath) {
      // ...
      return;
    }

    const buf = await readFile(filepath);
    const filename = filepath.split("\\").pop();
    if (!filename) {
      // ...
      return;
    }

    const file = new File([buf], filename);

    const dto: CreateSampleDTO = {
      name: filename,
      file: file,
      genres: [""],
      tags: [""],
      description: "",
    };

    isProcessing = true;
    try {
      console.time("Create sample instance");
      const response = await sampleService.create(dto);
      console.timeEnd("Create sample instance");

      if (!response.sample) {
        // ...
        return;
      }

      console.log(response);

      console.time("analyze_track");
      const result = await invoke("analyze_track", {
        path: filepath,
        updateMetadataToken: response.sample.updateMetadataToken,
      });

      console.log(result);

      console.timeEnd("analyze_track");
      // console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      isProcessing = false;
    }
  };

  const testRequest = async () => {
    const result = await invoke("create_sample_record", { path: "./test.mp3" });
    console.log(result);
  };
</script>

<div>
  <Button onclick={handleSelectFile}>Выбрать</Button>
  <Button onclick={testRequest}>Test request</Button>
  {#if isProcessing}
    <p>Анализируем...</p>
  {/if}
</div>
