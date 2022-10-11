import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    async addTask(title, description) {
      // console.log(title, description);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    async deleteSpecificTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
    },
    async editTask(id, title, description) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .eq("id", id);
    },
    async completeTask(id, bool) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: bool })
        .eq("id", id);
    },
  },
});
