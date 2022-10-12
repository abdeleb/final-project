<template>
  <header>
    <img src="../assets/logo.png" alt="logo" />
    <h1 class="title-text">Task Manager</h1>
    <span class="welcome-text">Welcome back {{ currentUser }}!</span>
    <a href="/">
      <img
        class="logout"
        @click="signOut"
        src="../assets/icons/logout-icon.png"
        alt="logout logo"
      />
    </a>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const currentUser = userStore.user.email.split("@")[0];

const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut();
    // if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    router.push("/auth/");
  }
};
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #009dff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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

.title-text {
  position: absolute;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.2rem;
  left: 55px;
  color: white;
}

.welcome-text {
  position: absolute;
  font-size: 0.9rem;
  color: white;
  right: 45px;
}
.logout {
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 8px;
}
.logout:hover {
  width: 1.6rem;
  height: 1.6rem;
}

@media screen and (max-width: 499px) {
  .title-text {
    display: none;
  }

  .welcome-text {
    display: none;
  }
}
</style>
