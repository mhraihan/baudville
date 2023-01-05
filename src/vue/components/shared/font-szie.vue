<template>
  <div class="flex ml-2 justify-end w-24">
    <form
      v-for="(size, key) in line.sizes"
      :key="key"
      :data-value="size.size"
      :aria-label="`Select ${size.size} font size for Line ${key + 1}`"
      tabindex="0"
      class="flex bg-white border border-gray-400 h-12 first:rounded-l last:rounded-r hover:bg-gray-600"
    >
      <input
        class="absolute invisible peer"
        type="radio"
        tabindex="-1"
        :id="`line${index}${key + 1}_${size.size}`"
        name="Line 1_fontSize"
        :value="size.font_size"
        :checked="size.font_size === fontSize[index]"
        @change="changeFontSize(size.font_size, index, key)"
      />

      <label
        :for="`line${index}${key + 1}_${size.size}`"
        class="px-1 w-12 h-full text-red-50 font-bold text-center text-xs cursor-pointer flex items-center justify-center peer-checked:bg-gray-700"
        :class="size.size === 'big' && 'text-2xl'"
        ><span class="visually-hidden pointer-events-none">A</span></label
      >
    </form>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    line: {
      type: Object,
      required: true,
    },
    index: Number,
  },
  setup(props, { emit }) {
    const store = useStore();

    const fontSize = computed(() => store.getters.getFontSize);
    const changeFontSize = (size, index, key) => {
      const prevFontSize = [...fontSize.value];
      prevFontSize[index] = size;
      store.dispatch("saveFontSize", prevFontSize);
      emit("updateFontSize", { index, key });
    };
    return {
      fontSize,
      changeFontSize,
    };
  },
};
</script>
