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
        <PersonalizationOptionInput :lines="lines" />
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
import { useStore } from "vuex";
import PersonalizationOptionInput from "./personalization-option-input.vue";
export default {
  components: {
    DivContainer,
    PriceTable,
    PersonalizationOptionInput,
  },
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
