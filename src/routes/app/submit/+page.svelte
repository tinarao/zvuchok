<script>
  import Button from "$lib/components/ui/button/button.svelte";

  /**
   *
   * 1. Загрузить сэмпл
   * 2. Сохранить в базу данных скелет
   * 3. Отправить в Rust на анализ пиков и длительности
   * 4. Отправить на модерацию
   * 5. Из Rust результат анализа отправить на бек
   */
</script>

<div class="flex items-center justify-center h-screen">
  <div>
    <Button href="/app/submit/sample">Сэмпл</Button>
    <Button>Сэмпл-пак</Button>
  </div>
</div>
