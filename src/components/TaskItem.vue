<template>
  <div class="task-container">
    <div class="task">
      <div class="task-header" :style="changeColor">
        <img
          @click="editMode = !editMode"
          src="../assets/icons/edit-icon.png"
          alt=""
        />
        <h4 v-if="editMode === false">{{ taskData.title }}</h4>
        <input
          v-else
          class="input-editTitle"
          v-model="taskData.title"
          type="text"
          placeholder="New title"
        />
        <img @click="deleteTask" src="../assets/icons/close-icon.png" alt="" />
      </div>
      <div class="task-body">
        <p><strong>Description:</strong></p>
        <p v-if="editMode === false">{{ taskData.description }}</p>
        <input
          v-else
          class="input-editDesc"
          v-model="taskData.description"
          type="text"
          placeholder="New description"
        />
      </div>
      <button
        v-if="editMode === false"
        class="btn"
        :style="changeColor"
        @click="completedTaskFn"
      >
        Complete task
      </button>
      <button v-else @click="saveEditedTask()" class="btn">Save changes</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/task.js";
import Swal from "sweetalert2";

const emit = defineEmits(["fetchTasks"]);

const props = defineProps(["taskData"]);
const taskStore = useTaskStore();

let myID = props.taskData.id;

const asyncDeleteTask = async () => {
  myID = props.taskData.id;
  await taskStore.deleteSpecificTask(myID);
  emit("fetchTasks");
};

const deleteTask = () => {
  Swal.fire({
    title: "Are you sure you want to delete this task?",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#FF8484",
    confirmButtonText: "Confirm",
    confirmButtonColor: "#009dff",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) {
      asyncDeleteTask();
      Swal.fire("Poof!", "Your task has been deleted!", "success");
    }
  });
};

const completedTask = ref(false);

const defaultBgColor = "background: #009DFF";
const colorGreen = "background: #02DA47";
const changeColor = computed(() =>
  props.taskData.is_complete === false ? defaultBgColor : colorGreen
);

const completedTaskFn = async () => {
  myID = props.taskData.id;
  completedTask.value = !completedTask.value;
  await taskStore.completeTask(myID, completedTask.value);
  emit("fetchTasks");
};

/* --- EDIT MODE --- */
const editMode = ref(false);

async function saveEditedTask() {
  myID = props.taskData.id;
  editMode.value = false;
  await taskStore.editTask(
    myID,
    props.taskData.title,
    props.taskData.description
  );
  emit("fetchTasks");
}
</script>

<style scoped>
.task-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.task {
  position: relative;
  width: 350px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 24px;
  border-radius: 0 0 8px 8px;
}
.task:hover {
  width: 360px;
  height: 220px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
}
.task-header h4 {
  margin: 6px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}
.task-header img {
  width: 12px;
  height: 12px;
  margin: 6px;
  cursor: pointer;
}

img:hover {
  width: 16px;
  height: 16px;
}

.task-body p strong {
  font-size: 0.9rem;
}
.task-body p {
  font-size: 0.8rem;
  margin: 10px;
}

.btn {
  border-radius: 8px;
  background-color: var(--bg-primary-color);
  margin: 70px auto 0 auto;
  padding: 4px 8px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  position: absolute;
  left: 35%;
  top: 45%;
}
.input-editTitle {
  background-color: var(--bg-secondary-color);
  width: 60%;
  padding: 0 6px;
  border-radius: 8px;
}
.input-editDesc {
  background: #f2f2f2;
  margin: 12px;
  width: 92%;
  padding: 0 6px;
  border-radius: 8px;
}
@media screen and (max-width: 449px) {
  .task {
    width: 300px;
  }
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
