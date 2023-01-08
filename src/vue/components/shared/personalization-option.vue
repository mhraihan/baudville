<template>
  <DivContainer>
    <div class="px-0 pt-2 pb-4 mb-4 border-b border-teal-200">
      <div>Personalization is free for this item</div>
    </div>
    <div class="pb-4">
      <div class="">
        <div class="flex items-center mb-4">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              id="personalization[no]"
              v-model="personalization"
              type="radio"
              name="personalization-toggle"
              :value="false"
            />
          </div>
          <label for="personalization[no]" class="text-sm font-bold"
            ><span class="">No Personalization</span></label
          >
        </div>

        <div class="flex items-center mb-4">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              id="personalization[yes]"
              v-model="personalization"
              type="radio"
              name="personalization[yes]"
              :value="true"
            />
          </div>
          <label for="personalization[yes]" class="text-sm font-bold"
            ><span class="">Personalization - Enter text below</span></label
          >
        </div>
      </div>
      <div v-if="Object.keys(fonts).length">
        <div class="my-6">
          <p class="mb-2">
            <label for="choose-fonts" class="text-sm font-bold"
              >Choose A Font</label
            >
          </p>
          <div class="w-full">
            <select
              id="choose-fonts"
              class="w-full h-12 px-4 py-2 border-gray-200 focus:ring-0 focus:outline-none"
              @change="changeFont($event)"
            >
              <option
                :selected="font.default"
                v-for="(font, key) in fonts"
                :key="key"
                :value="JSON.stringify(font)"
                v-text="font.name"
              />
            </select>
          </div>
        </div>
      </div>
      <div v-if="personalization" class="">
        <PriceTable v-if="price" />
        <p class="flex justify-end">
          <button
            @click="add"
            class="tracking-wide button button-product font-bn !text-xl"
          >
            + Add Another
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
              :labelText="`Line ${index + 1}`"
              :line="line"
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
      </div>
      <div v-if="Object.keys(verses).length">
        <div class="mt-8">
          <div class="w-full">
            <select
              id="choose-verses"
              class="w-full h-12 px-4 py-2 border-gray-200 focus:ring-0 focus:outline-none"
              @change="changeVerse($event)"
            >
              <option
                :selected="verse.default"
                v-for="(verse, key) in verses"
                :key="key"
                :value="JSON.stringify(verse)"
                v-text="verse.name"
              />
            </select>
            <p class="my-2">
              <label for="choose-verses" class="text-sm font-bold"
                >Enter A Custom Verse</label
              >
            </p>
          </div>
          <div class="block">
            <textarea
              @keyup="updateVerse($event)"
              maxlength="750"
              id="verse"
              name="verse"
              class="w-full h-44 border border-gray-400 px-1 py-3 rounded focus:outline-none focus:border-gray-100 focus:transition text-center"
              v-model="verseText"
            ></textarea>
            <div class="value__note">
              Write your custom greeting here. 750 characters max.
            </div>
          </div>
        </div>
      </div>
    </div>
  </DivContainer>
</template>
<script>
import { filter } from "lodash";

import { ref, computed, watch } from "vue";
import DivContainer from "./div-container.vue";
import PriceTable from "./price-table.vue";
import StepInput from "./step-input.vue";
import { useStore } from "vuex";
export default {
  components: { DivContainer, PriceTable, StepInput },
  props: {
    lines: {
      type: Object,
      required: true,
    },
    verses: Object,
    fonts: Object,
    price: Boolean,
  },
  setup() {
    const store = useStore();
    const personalization = ref(true);
    const activeLayout = computed(() => store.getters.getLayout);
    const verseText = computed(() => store.getters.getVerse);
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
    const changeFont = (event) => {
      const font = JSON.parse(event.target.value);
      store.dispatch("saveFont", font.value);
    };
    const changeVerse = (event) => {
      const verse = JSON.parse(event.target.value);
      const text = filter(verse?.layouts, ["layout", activeLayout.value]);
      store.dispatch("saveVerse", text[0]?.value || verse?.value);
    };
    const updateVerse = (event) => {
      store.dispatch("saveVerse", event.target.value);
    };

    watch(item.value, () => {
      store.dispatch("updateItem", {
        item: { ...item.value },
        index: index.value,
      });
    });

    return {
      personalization,
      item,
      items,
      add,
      edit,
      remove,
      index,
      changeFont,
      changeVerse,
      verseText,
      updateVerse,
    };
  },
};
</script>

<style scoped>
select:focus,
textarea:focus {
  border-color: #6a747c;
  box-shadow: 0 0 0 1px #6a747c;
  outline: none;
  -webkit-transition: border 0.1s, box-shadow 0.1s;
  transition: border 0.1s, box-shadow 0.1s;
}
</style>
