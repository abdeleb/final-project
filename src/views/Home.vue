<template>
  <Nav />
  <main>
    <div class="newtask-container">
        <div class="newtask">
          <div class="newtask-text">
            <img src="../assets/logo-app.png" alt="">
            <h1>Welcome to Task Manager</h1>
            <h2>This tool will help you organize your tasks easily and simply.</h2>
          </div>
          <NewTask />
        </div>
    </div>
    <div class="todo-container">
      <div class="todo-container-child">
        <h1>To Do</h1>
        <div class="todo">
          <TaskItem />
        </div>
      </div>
    </div>
    <div class="done-container">
      <div class="done-container-child">
        <h1>Done</h1>
        <div class="done">
          <TaskItem />
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItemVue from '../components/TaskItem.vue';
import TaskItem from '../components/TaskItem.vue';
</script>

<style scoped>
main {
    background-color: white;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.newtask,
.newtask-text,
.todo-container,
.todo-container-child,
.done-container,
.done-container-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.newtask-container, .todo-container, .done-container {
  width: 30%;
}

.newtask-text {
  width: 90%;
}

img {
  width: 75px;
  margin-bottom: 12px;
}

.newtask-text h1 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
}

/* --- To Do & Done --- */

.todo-container h1, .done-container h1 {
  color: white;
  font-weight: bold;
  font-size: 1rem;
  margin: 12px 0;
}

.todo-container-child, .done-container-child {
  background-color: #009DFF;
  border-radius: 8px;
  width: 90%;
}

.done-container-child {
  background-color: rgb(46, 213, 49);
}

.todo, .done {
  background-color: white;
  width: 95%;
  height: 100%;
  margin-bottom: 8px;
}




/* @media screen and (max-width: 769px) {
} */
</style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
