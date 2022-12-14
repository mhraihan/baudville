<template>
  <DivContainer>
    <div class="mb-6" v-if="activeLayout">
      <p class="mb-4 text-sm font-bold">Choose a Layout</p>
      <div class="w-full">
        <div class="inline-block w-32 mx-1 mb-4 thumbnail-list-item">
          <input
            type="radio"
            id="layout_0"
            name="layout"
            class="absolute invisible thumbnail-list-item__input"
            key="L"
            value="L"
            v-model="activeLayout"
          />
          <label
            @click="selectLayout('L')"
            for="layout_0"
            tabindex="0"
            class="block p-0 border border-gray-400 rounded cursor-pointer"
          >
            <div class="pointer-events-none">
              <img
                src="https://s7d7.scene7.com/is/image/Baudville/Landscape?&amp;$bv_config_graphic_thumb_wide_2x$"
              />
              <div
                class="p-4 font-semibold leading-4 text-center text-white bg-gray-400"
              >
                Landscape
              </div>
            </div>
          </label>
        </div>
        <div class="inline-block w-32 mb-4 ml-3 mr-0 thumbnail-list-item">
          <input
            type="radio"
            id="layout_1"
            name="layout"
            class="absolute invisible thumbnail-list-item__input"
            key="P"
            value="P"
            v-model="activeLayout"
          />
          <label
            @click="selectLayout('P')"
            for="layout_1"
            tabindex="0"
            class="block p-0 border border-gray-400 rounded cursor-pointer"
          >
            <div class="pointer-events-none">
              <img
                src="https://s7d7.scene7.com/is/image/Baudville/Portrait?&$bv_config_graphic_thumb_wide_2x$"
              />
              <div
                class="p-4 font-semibold leading-4 text-center text-white bg-gray-400"
              >
                Portrait
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div v-if="type === 'select'">
      <div v-for="(option, key) in options" :key="key" class="mb-6">
        <div class="">
          <div class="">
            <p class="mb-3">
              <label for="option-1" class="text-sm font-bold">{{
                option.label
              }}</label>
            </p>
          </div>
          <div class="w-full">
            <select
              :id="'option-' + option.id"
              class="w-full px-4 py-2 border-gray-200 focus:ring-0 focus:outline-none"
              @change="change($event, option.category)"
            >
              <option
                :selected="defaultSelected(setting, option.category)"
                v-for="(setting, key) in option.settings"
                :key="key"
                :value="JSON.stringify(setting)"
                v-text="setting.name"
              />
            </select>
          </div>
        </div>
        <div
          v-if="text"
          class="mt-8 text-sm font-medium leading-6 text-center text-gray-100 font-mont"
          v-html="text"
        />
      </div>
    </div>
    <div v-if="type === 'radio'">
      <div v-for="(option, key) in options" :key="key" class="mb-6">
        <p class="mb-3 text-sm font-bold">{{ option.label }}</p>
        <div class="grid w-full grid-cols-3">
          <div
            v-for="(setting, key) in option.settings"
            :key="key"
            class="inline-block mx-1 mb-4 thumbnail-list-item"
          >
            <input
              type="radio"
              :id="setting.value"
              name="layout"
              class="absolute invisible thumbnail-list-item__input"
              :value="setting.value"
              @change="updateScene7Id(setting.value)"
              :checked="scene7Id === setting.value"
            />
            <label
              :for="setting.value"
              tabindex="0"
              class="block p-0 border border-gray-400 rounded cursor-pointer"
            >
              <div class="pointer-events-none">
                <img
                  :src="`https://s7d7.scene7.com/is/image/Baudville/${setting.thumbnail}?$bv_config_graphic_thumb_wide_2x$`"
                />
                <div
                  class="p-1 font-semibold leading-4 text-center text-white bg-gray-400"
                >
                  {{ setting.name }}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <PersonalizationOptionInput label="add another kit" :lines="lines" />
    </div>
  </DivContainer>
</template>
<script>
import { filter, each } from "lodash";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import DivContainer from "./div-container.vue";
import PersonalizationOptionInput from "./personalization-option-input.vue";
export default {
  components: { DivContainer, PersonalizationOptionInput },

  props: {
    options: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: "select",
    },
  },
  setup(props) {
    const store = useStore();

    const activeLayout = computed(() => store.getters.getLayout);
    const scene7Id = ref(computed(() => store.getters.getScene7Id));
    const emblemId = ref(computed(() => store.getters.getEmblem));
    const text = ref(props?.options[0]?.settings[0]?.description);
    const lines = computed(
      () =>
        filter(props?.options[0]?.settings, ["value", scene7Id.value])[0]?.lines
    );
    const change = (event, category = "sentiment") => {
      const setting = JSON.parse(event.target.value);
      if (category === "emblem") {
        store.dispatch(
          "saveEmblem",
          setting.value ||
            filter(setting.layouts, ["layout", activeLayout.value])[0]?.value
        );
      } else {
        text.value = setting.description;
        store.dispatch(
          "saveScene7Id",
          setting.value ||
            filter(setting.layouts, ["layout", activeLayout.value])[0]?.value
        );
      }
    };
    const updateScene7Id = (val) => store.dispatch("saveScene7Id", val);
    const selectLayout = (value) => {
      each(props.options, (option) => {
        if (option.category == "emblem") {
          const property = filter(option.settings, {
            layouts: [{ value: emblemId.value }],
          })[0]?.layouts;
          store.dispatch(
            "saveEmblem",
            filter(property, ["layout", value])[0].value
          );
        }
        if (option.category == "sentiment") {
          const property = filter(option.settings, {
            layouts: [{ value: scene7Id.value }],
          })[0]?.layouts;
          store.dispatch(
            "saveScene7Id",
            filter(property, ["layout", value])[0].value
          );
        }
      });
      store.dispatch("saveLayout", value);
    };
    const defaultSelected = (setting, category) => {
      if (activeLayout.value) {
        if (category == "emblem") {
          return (
            filter(setting.layouts, ["layout", activeLayout.value])[0].value ===
            emblemId.value
          );
        }
        return (
          filter(setting.layouts, ["layout", activeLayout.value])[0].value ===
          scene7Id.value
        );
      } else {
        if (category == "emblem") {
          return setting.value === emblemId.value;
        }
        return setting.value === scene7Id.value;
      }
    };
    return {
      text,
      scene7Id,
      activeLayout,
      lines,
      change,
      selectLayout,
      defaultSelected,
      updateScene7Id,
    };
  },
};
</script>
<style scoped>
.thumbnail-list-item__input:checked + label {
  box-shadow: 0 0 0 3px #f2f3f3, 0 0 0 6px #6a747c;
}
</style>
