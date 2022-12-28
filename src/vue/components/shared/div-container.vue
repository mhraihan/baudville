<template>
  <div
    class="px-4 pt-4 pb-12 overflow-y-auto bg-gray-600 configurator-step__content"
  >
    <slot></slot>
  </div>
</template>
<style scoped>
.configurator-step__content {
  max-height: calc(630px - 100px);
}
</style>
