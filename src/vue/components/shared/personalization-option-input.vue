<template>
  <p class="flex justify-end">
    <button
      @click="add"
      class="tracking-wide button button-product font-bn !text-xl"
    >
      + {{ label }}
    </button>
  </p>
  <div
    :class="items.length < 2 && 'pt-4 mt-4 border-t border-teal-200'"
    class=""
  >
    <div v-for="(item, key) in items" :key="key">
      <div
        v-if="key !== index"
        class="pt-4 mt-4 border-t border-teal-200 flex items-center mb-4"
      >
        <h3
          class="heading heading--6 heading--center flex !text-xl font-bold leading-none flex-col !mb-0"
        >
          <span class="text-gray-100">Item {{ key + 1 }}</span>
          <span @click="edit(key)" class="text-base cursor-pointer"
            >(Edit)</span
          >
        </h3>
        <div class="flex flex-col ml-4">
          <div
            class="mb-1"
            v-for="(value, index) in Object.values(item)"
            :key="index"
          >
            <span v-if="value" class="pr-1 font-medium font-capitalize"
              >Line {{ index + 1 }}:</span
            >
            <span v-if="value" class="font-medium font-capitalize">{{
              value
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="" :class="items.length > 1 && 'p-4 bg-white rounded'">
      <h3
        v-if="items.length > 1"
        class="heading heading--6 heading--center flex !text-xl font-bold leading-none flex-col"
      >
        <span class="text-gray-100">Item {{ index + 1 }}</span>
      </h3>
      <StepInput
        v-for="(line, index) in lines"
        :key="index"
        :index="index"
        :id="`line${index + 1}`"
        :labelText="line?.label || `Line ${index + 1}:`"
        :line="line"
        :type="
          line?.label === 'Gift Message' || line?.type === 'textarea'
            ? 'textarea'
            : 'input'
        "
        v-model="item[`line${index + 1}`]"
      />
    </div>
    <div
      v-if="items.length > 1"
      class="configurator-quantity-group__actions mt-4"
    >
      <button
        @click="remove(index)"
        class="bg-white button button-secondary !font-bold font-mont !border-2 border-gray-100 color-gray-100 hover:bg-gray-100"
      >
        - Remove
      </button>
      <p class="hidden">This product has a minimum quantity of 1</p>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch } from "vue";
import StepInput from "./step-input.vue";
import { useStore } from "vuex";
export default {
  components: { StepInput },
  props: {
    lines: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      default: "add another",
    },
  },
  setup() {
    const store = useStore();
    const item = ref({});
    const items = computed(() => store.getters.getItems);
    const index = ref(0);
    item.value = {
      ...item.value,
      ...store.getters.getLastItem,
    };
    const update = () => {
      index.value = store.getters.getItemSize;
      store.dispatch("updateActiveIndex", index.value);
    };
    const add = () => {
      store.dispatch("saveItems", { ...item.value });
      update();
    };
    const edit = (key) => {
      index.value = key;
      store.dispatch("updateActiveIndex", key);
      const getItem = { ...store.getters.getItemById(key) };
      item.value.line1 = getItem.line1;
      item.value.line2 = getItem.line2;
      item.value.line3 = getItem.line3;
      item.value.line4 = getItem.line4;
      item.value.line5 = getItem.line5;
      item.value.line6 = getItem.line6;
    };

    const remove = (key) => {
      const idx = key - 1 >= 0 ? key - 1 : 0;
      store.dispatch("deleteItem", key);
      update();
      edit(idx);
    };
    watch(item.value, () => {
      store.dispatch("updateItem", {
        item: { ...item.value },
        index: index.value,
      });
    });

    return {
      item,
      items,
      add,
      edit,
      remove,
      index,
    };
  },
};
</script>
