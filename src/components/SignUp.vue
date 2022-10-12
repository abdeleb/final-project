<template>
  <main>
    <div class="ilustration-section">
      <img src="../assets/signup-ilustration.svg" alt="" />
    </div>
    <div class="signup-section">
      <div class="form-container">
        <div class="title">Sign Up</div>
        <p class="subtitle">
          Register to be able to enjoy all the benefits of our application!
        </p>
        <form @submit.prevent="signUp">
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              v-model="email"
              id="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              v-model="password"
              id="password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              v-model="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <button class="btn" type="submit">Sign Up</button>
          <p>
            <span>Have an account? </span>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import Swal from "sweetalert2";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign in";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      Swal.fire({
        title: `${error.message}`,
        confirmButtonText: "Ok",
        confirmButtonColor: "#009dff",
        icon: "info",
      });
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  Swal.fire({
    title: `${errorMsg.value}`,
    confirmButtonText: "Ok",
    confirmButtonColor: "#009dff",
    icon: "info",
  });
}
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
  width: 60%;
}
.signup-section {
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
.subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
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
.btn:hover {
  background: #0288f6;
  cursor: pointer;
}
p {
  margin-top: 0.6rem;
}
p span {
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
  .signup-section {
    width: 75%;
  }
  .form-container {
    width: 100%;
  }
}
</style>
