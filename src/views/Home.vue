<template>
  <Suspense>
    <template #default>
      <HomePageComponent />
    </template>
    <template #fallback>
      <SplashScreen />
    </template>
  </Suspense>
</template>

<script setup>
import SplashScreen from "../components/SplashScreen.vue";
import { defineAsyncComponent } from "vue";
import HomePage from "../components/HomePage.vue";

const HomePageComponent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("../components/HomePage.vue"));
    }, 2500);
  });
});
</script>

<style></style>
