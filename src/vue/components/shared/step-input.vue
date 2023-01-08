<template>
  <div class="flex w-full mb-4" :class="type === 'textarea' && 'flex-col'">
    <label :for="id" class="py-2 mr-4 text-sm font-bold">
      <span class="property__text">{{ labelText }}</span>
    </label>
    <div class="flex flex-col flex-1">
      <component
        :is="type"
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
    <FontSize
      v-if="line.sizes?.length > 1"
      :line="line"
      :index="index"
      @updateFontSize="updateFontSize"
    />
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import FontSize from "./font-szie.vue";
export default {
  components: { FontSize },
  props: {
    id: String,
    labelText: String,
    modelValue: String,
    line: Object,
    index: Number,
    type: {
      type: String,
      default: "input",
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const sizeIndex = ref(0);
    const limit = computed(() =>
      store.getters.getLayout
        ? props.line?.layouts[store.getters.getLayout]?.character_limit
        : (props.line?.sizes &&
            props.line?.sizes[sizeIndex.value]?.character_limit) ||
          props.line.character_limit
    );
    const count = ref(limit.value);
    // check overflow when layout changes
    const updateInput = (text = props.modelValue) => {
      const textVal = text.slice(0, limit.value);
      count.value = limit.value - textVal?.length;

      emit("update:modelValue", textVal);
    };
    const change = (e) => {
      updateInput(e.target.value);
    };
    updateInput();
    const updateFontSize = (size) => (sizeIndex.value = size.key);
    watch(sizeIndex, (va) => {
      updateInput();
    });

    return {
      count,
      change,
      updateFontSize,
    };
  },
};
</script>
