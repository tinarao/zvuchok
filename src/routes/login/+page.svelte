<script lang="ts">
  import { Button } from "@/lib/components/ui/button";
  import { Input } from "@/lib/components/ui/input";
  import { Label } from "@/lib/components/ui/label";
  import { LoaderCircle, UserPlus } from "lucide-svelte";
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { authService } from "@/lib/api/authService.js";
  import { loginFormValidation } from "@/lib/validations/user.js";
  import { onMount } from "svelte";

  let isSigningIn = $state(false);

  let username = $state<string | undefined>(undefined);
  let password = $state<string | undefined>(undefined);

  onMount(async () => {
    const isAuthenticated = await authService.authenticate();
    if (isAuthenticated) {
      console.log("authenticated");
      goto("/app");
    }
  });

  const handleSubmit = async () => {
    if (!username || !password) {
      toast.error("Заполните все поля");
      return;
    }

    const data = { username, password };
    const result = loginFormValidation.safeParse(data);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    const response = await authService.login(data);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    toast.success("Успешно!");
    goto("/app");
    return;
  };
</script>

<div
  class="h-screen flex items-center justify-center bg-gradient-to-bl from-amber-500 via-rose-500 to-violet-500"
>
  <div class="w-96 border p-4 bg-white rounded-md">
    <h1 class="text-xl text-center font-medium">
      Войдите, чтобы продолжить искать семплы
    </h1>
    <form onsubmit={handleSubmit} class="space-y-2">
      <div>
        <Label>Имя пользователя</Label>
        <Input bind:value={username} disabled={isSigningIn} name="username" />
      </div>
      <div>
        <Label>Пароль</Label>
        <Input bind:value={password} disabled={isSigningIn} name="password" />
      </div>
      <hr />
      <div class="flex items-center justify-center">
        <Button disabled={isSigningIn} type="submit">
          {#if isSigningIn}
            <LoaderCircle class="size-4 mr-2 animate-spin" /> Секунду...
          {:else}
            <UserPlus class="size-4 mr-2" /> Войти
          {/if}
        </Button>
      </div>
    </form>
  </div>
</div>
