<template>
  <button
    class="relative flex justify-center w-full p-3 text-xl text-white uppercase primary-bg heading-font"
    @click="$emit('back')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="absolute w-5 h-5 left-3 top-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
    {{ name }}
  </button>
</template>
<script>
export default {
  name: "StepHeader",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {},
};
</script>
