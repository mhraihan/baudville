<template>
  <DivContainer>
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
            @change="change($event)"
          >
            <option
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
  </DivContainer>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import DivContainer from "./div-container.vue";

export default {
  components: { DivContainer },

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
    const text = ref(props?.options[0]?.settings[0]?.description);
    const change = (event) => {
      const setting = JSON.parse(event.target.value);
      text.value = setting.description;
      store.dispatch("saveScene7Id", setting.value);
    };

    return {
      text,
      change,
    };
  },
};
</script>
