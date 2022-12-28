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
            @change="change($event)"
            :id="'option-' + option.id"
            class="w-full px-4 py-2 border-gray-200 focus:ring-0 focus:outline-none"
          >
            <option
              v-for="(setting, key) in option.settings"
              :key="key"
              :value="JSON.stringify(setting)"
              v-text="setting.name"
            ></option>
          </select>
        </div>
      </div>
      <div
        class="mt-8 text-sm font-medium leading-6 text-center text-gray-100 font-mont"
        v-html="text"
      ></div>
    </div>
  </DivContainer>
</template>
<script>
import { ref } from "vue";
import DivContainer from "./div-container.vue";

export default {
  components: { DivContainer },

  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const sentiment = ref(props?.options[0]?.settings[0]);
    const text = ref(props?.options[0]?.settings[0]?.content);
    const change = (event) => {
      const setting = JSON.parse(event.target.value);
      console.log(setting.name);
      text.value = setting.content;
    };

    return {
      text,
      change,
    };
  },
};
</script>
