<template>
<form>
<div>
  <label>Give the task a name!</label>
  <input 
    class="title-input" 
    type="text" 
    placeholder="Title"
    v-model="taskTitle"  
  >
</div>
<div>
  <label>What are you thinking to do?</label>
  <textarea 
    class="description-input" 
    placeholder="Description" 
    rows="5"
    v-model="taskDesc"    
  ></textarea>
</div>
<button @click.prevent="uploadTask" >Add task</button>
</form>
</template>
  
<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useTaskStore } from '../stores/task';
  
const emit = defineEmits(["childNewTask"]);

let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");

function uploadTask() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required.";
    setTimeout(() => {
      errorBool.value = false;
    }, 1000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    console.log(taskTitle.value);
  }
};
// constant to save a variable that define the custom event that will be emitted to the homeView
// constant to save a variable that holds the value of the title input field of the new task
// constant to save a variable that holds the value of the description input field of the new task
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
// const constant to save a variable that holds the value of the error message
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style scoped>
form {
  width: 600px;
  margin: 24px 0;
  border-radius: 12px;
  padding: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-weight: bold;
}

form div {
  margin: 12px;
  align-items: center;
  width: 100%;
}

form div label {
  margin-bottom: 12px;
}

input, textarea {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 6px;
  width: 100%;
  background-color: white;
}

button {
  margin-top: 12px;
  color: white;
  border-radius: 6px;
  background-color: #009DFF;
  padding: 10px;
  width: 100%;
}

@media screen and (max-width: 769px) {
  form {
    width: 100%;
  }
  div label {
    font-size: .8rem;
  }
}
</style>
