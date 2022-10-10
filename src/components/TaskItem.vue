<template>
  <div class="task-container">
      <div class="task">
        <div class="task-header">
          <a href="/">
            <img src="../assets/icons/edit-icon.png" alt="">
          </a>
          <h4>Title</h4>
          <a href="">
            <img @click="deleteTask" src="../assets/icons/close-icon.png" alt="">
          </a>
        </div>
        <div class="task-body">
          <p>{{ taskData.title }}</p>
          <p>{{ taskData.description }}</p>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task.js";

const props = defineProps(["taskData"]);
const taskStore = useTaskStore();

let myID = props.taskData.id;

async function deleteTask() {
  myID = props.taskData.id;
  if (confirm("Are you sure you want to delete task id " + myID + "?")) {
    await taskStore.deleteSpecificTask(myID);
    emit("updateTasksAgain");
  }
}

// const props = defineProps(["ENTER-PROP-HERE"]);
</script>

<style scoped>
.task-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

}
.task {
  width: 250px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 24px;
  border-radius: 0 0 8px 8px;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  background-color: #009DFF;
}
.task-header h4 {
  margin: 6px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}
.task-header a img {
  width: 12px;
  height: 12px;
  margin: 6px;
}
.task-body p {
  font-size: .8rem;
  margin: 10px;
}
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
