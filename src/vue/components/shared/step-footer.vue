<template>
  <div
    class="absolute bottom-0 left-0 flex w-full border-t primary-border-color"
  >
    <button
      @click="$emit('back')"
      class="flex items-center justify-center flex-1 p-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <button
      v-if="step === 4"
      @click="$emit('add-cart')"
      class="flex items-center justify-center flex-1 p-4 text-2xl leading-none uppercase border-l primary-border-color font-bn"
    >
      ADD TO Cart
    </button>
    <button
      v-else
      @click="$emit('next')"
      class="flex items-center justify-center flex-1 p-4 border-l primary-border-color"
    >
      <svg
        title="Accept"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17 16"
        class="svg-icon--small svg-icon svg-icon--secondary-color svg-icon--configurator-action"
      >
        <path
          d="M14.4.1C9.6 1.4 7.3 5.4 5.8 9.7c-.7-.8-1.3-1.7-2-2.5-1.6-2-5 .1-3.4 2.2 1.5 1.9 3 3.9 4.5 5.8 1.1 1.4 3.2 1.1 3.7-.7 1-4.2 2.3-9.2 7.1-10.6 2.5-.7 1.2-4.5-1.3-3.8z"
        ></path>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "step-footer",
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  setup() {},
};
</script>
