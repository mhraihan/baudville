<template>
  <div>
    <slot />
    <p>HMM love you</p>
    <ul>
      <li v-for="(value, index) in shopifyData" :key="index">
        {{ index }}: {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shopifyData: {
      type: Object,
      required: true,
    },
  },
};
</script>
