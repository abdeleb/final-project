<template>
  <header>
    <img src="../assets/logo.png" alt="logo">
    <a href="/">
    <img src="../assets/logout-icon.png" alt="logout logo">
    </a>
  </header>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
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

header img {
  margin: 8px;
}

header img {
  width: 2.6rem;
  height: 2.6rem;
}

a img {
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 8px;
}
</style>
