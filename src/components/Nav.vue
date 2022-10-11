<template>
  <header>
    <img src="../assets/logo.png" alt="logo">
    <img class="logout" @click="signOut" src="../assets/icons/logout-icon.png" alt="logout logo">
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
//constant to save a variable that will hold the use router method
const router = useRouter();
// constant to save a variable that will get the user from store with a computed function imported from vue
// constant that calls user email from the useUSerStore
// constant that saves the user email and cleans out the @client from the user
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    router.push("/auth/login");
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #009DFF;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

img {
  cursor: pointer;
}

header img {
  margin: 8px;
}

header img {
  width: 2.4rem;
  height: 2.4rem;
}

.logout {
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 8px;
}
header img:hover {
  width: 2.6rem;
  height: 2.6rem;
}
.logout:hover {
  width: 1.6rem;
  height: 1.6rem;
}
</style>
