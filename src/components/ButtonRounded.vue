<template>
  <div class="onoffswitch">
    <input
      @click="$emit('filterModeEvent')"
      type="checkbox"
      name="onoffswitch"
      class="onoffswitch-checkbox"
      id="myonoffswitch"
      tabindex="0"
      checked
    />
    <label class="onoffswitch-label" for="myonoffswitch"></label>
  </div>
</template>

<script setup>
const emit = defineEmits(["filterModeEvent"]);
</script>

<style scoped>
.onoffswitch {
  position: relative;
  width: 55px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.onoffswitch-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  height: 20px;
  padding: 0;
  line-height: 20px;
  border: 0px solid #ffffff;
  border-radius: 30px;
  background-color: #02da47;
}
.onoffswitch-label:before {
  content: "";
  display: block;
  width: 30px;
  margin: -5px;
  background: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 31px;
  border-radius: 30px;
  box-shadow: 0 6px 12px 0px #757575;
}
.onoffswitch-checkbox:checked + .onoffswitch-label {
  background-color: #d9d9d9;
}
.onoffswitch-checkbox:checked + .onoffswitch-label,
.onoffswitch-checkbox:checked + .onoffswitch-label:before {
  border-color: #02da47;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label:before {
  right: 0px;
  box-shadow: 3px 6px 18px 0px rgba(0, 0, 0, 0.2);
}
</style>
