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
    rows="2"
    v-model="taskDesc"    
  ></textarea>
</div>
<p v-if="errorMsg" :style="'color: red'">
  {{ errorMsg }}
</p>
<button @click.prevent="uploadTask">Add task</button>
</form>
</template>
  
<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useTaskStore } from '../stores/task';

const emit = defineEmits(["fetchTasks"]);

let taskTitle = ref("");
let taskDesc = ref("");
const errorMsg = ref("");

const taskStore = useTaskStore();

async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
}

function uploadTask() {
  if (taskTitle.value === "" || taskDesc.value === "") {
    errorMsg.value = "Title and description is required.";
    setTimeout(() => {
      errorMsg.value = false;
    }, 2500);
  } else {
    sendToStore(taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    emit('fetchTasks');
  }
};
</script>

<style scoped>
form {
  width: 60%;
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
