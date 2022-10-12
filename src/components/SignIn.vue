<template>
  <main>
    <div class="ilustration-section">
      <img src="../assets/ilustration.png" alt="" />
    </div>
    <div class="signin-section">
      <div class="form-container">
        <div class="title">Hello! Welcome back. 👋</div>
        <!-- <PersonalRouter :route="route" :buttonText="buttonText" /> -->
        <p class="loginText">
          Log in with your data that you entered during your registration.
        </p>
        <form @submit.prevent="signIn">
          <div class="signin-form">
            <label for="">Email address</label>
            <input
              type="email"
              placeholder="example@email.com"
              v-model="email"
              id="email"
              required
            />
          </div>
          <div>
            <label for="">Password</label>
            <div>
              <input
                :type="passwordFieldType"
                onpaste="return false"
                placeholder="Enter password"
                v-model="password"
                id="password"
                required
              />
              <span>
                <!-- <EyeIcon :class="[passwordFieldIcon]" @click.prevent="hidePassword = !hidePassword" /> -->
              </span>
            </div>
          </div>
          <button class="btn" type="submit">Start now!</button>
          <p class="signup-route">
            <span>Don’t have an account? </span>
            <PersonalRouter
              class="routeBtn"
              :route="route"
              :buttonText="buttonText"
            />
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  await useUserStore().signIn(email.value, password.value);
  redirect.push({ path: "/" });
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.ilustration-section {
  width: 50%;
  height: 100%;
  background-color: #009dff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ilustration-section img {
  width: 90%;
}

.signin-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
}

.form-container {
  width: 75%;
}

.title {
  font-size: 2rem;
  font-family: "Open sans";
  font-weight: 500;
  margin: 1.5rem 0;
}

.loginText {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
}

.signin-form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 0.8rem 0 2rem 0;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 5px;
  width: 100%;
}

::placeholder {
  color: rgb(219, 219, 219);
  opacity: 1;
}

.btn {
  background-color: #009dff;
  color: white;
  width: 100%;
  border-radius: 6px;
  padding: 0.8rem 0;
}

.signup-route {
  margin-top: 0.6rem;
  color: rgb(113, 112, 112);
}

.routeBtn {
  color: #009dff;
  font-weight: 500;
}

@media screen and (max-width: 769px) {
  .ilustration-section {
    display: none;
  }

  .signin-section {
    width: 75%;
  }

  .form-container {
    width: 100%;
  }
}
</style>
