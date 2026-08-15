<template>
  <div style="max-width: 400px; margin: 100px auto">
    <h1>Регистрация</h1>

    <input v-model="email" placeholder="Email" />

    <br /><br />

    <input v-model="password" type="password" placeholder="Password" />

    <br /><br />

    <button @click="register">Зарегистрироваться</button>
  </div>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');

const supabase = useSupabaseClient();

const register = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  console.log(data);
  console.log(error);
};
</script>
