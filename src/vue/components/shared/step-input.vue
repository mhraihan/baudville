<template>
  <div class="flex w-full mb-4">
    <label :for="id" class="w-24 py-2 text-sm font-bold">
      <span class="property__text">{{ labelText }}</span>
    </label>
    <div class="flex flex-col w-full px-2">
      <input
        :value="modelValue"
        @keyup="change($event)"
        :id="id"
        type="text"
        :name="id"
        :maxlength="line.character_limit"
        class="w-full h-12 px-3 py-1 border border-gray-400 rounded"
      />
      <p>{{ count }} characters remaining</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    id: String,
    labelText: String,
    modelValue: String,
    line: Object,
  },
  setup(props, { emit }) {
    const count = ref(props.line.character_limit);
    const change = (e) => {
      const text = e.target.value;
      count.value = props.line.character_limit - text.length;
      emit("update:modelValue", text);
    };

    return {
      count,
      change,
    };
  },
};
</script>
