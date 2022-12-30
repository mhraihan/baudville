<template>
  <button
    class="flex items-center justify-between w-full text-xl text-white bg-teal-100 border-b-2 border-white heading-font p-7"
    @click="$emit('stepChange')"
  >
    <span class="flex items-center">
      <span
        class="flex items-center justify-center w-6 h-6 mr-4 text-sm font-bold text-teal-100 bg-white rounded-full"
        >{{ step_number }}</span
      >
      <span>{{ name }}</span>
    </span>
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </span>
  </button>
</template>
<script>
export default {
  name: "StepButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    step_number: {
      type: Number,
      required: true,
    },
  },
  setup() {},
};
</script>
