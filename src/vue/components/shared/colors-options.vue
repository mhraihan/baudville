<template>
  <DivContainer>
    <div class="mb-2">
      <p class="text-sm font-bold mb-4">{{ option.name }}</p>
    </div>
    <div class="w-full flex flex-wrap">
      <div
        v-for="(color, key) in option.colors"
        :key="key"
        class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 block text-center mb-4"
      >
        <label
          :for="'color_' + key"
          class="block pt-0 pb-2 px-1 font-bold text-xs"
          ><input
            type="radio"
            :id="'color_' + key"
            name="color"
            class="configurator-color-list__input invisible absolute"
            :value="color.hex_value"
            @change="change(color.hex_value)"
          /><i
            tabindex="0"
            :aria-label="'color:' + color.name"
            class="configurator-color-list__swatch block relative w-full h-0 pb-[100%]"
            :style="`background-color:#${color.hex_value}`"
          ></i>
          <div class="mt-2">{{ color.name }}</div></label
        >
      </div>
    </div>
  </DivContainer>
</template>
<script>
import { useStore } from "vuex";
import DivContainer from "./div-container.vue";

export default {
  components: { DivContainer },
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const change = (color) => {
      store.dispatch("saveTemplateColor", color);
    };
    return {
      change,
    };
  },
};
</script>

<style scoped>
.configurator-color-list__input:checked
  + .configurator-color-list__swatch::before,
.configurator-color-list__swatch:focus::before {
  content: "";
  display: block;
  position: absolute;
  top: -4px;
  left: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  border: 2px solid #a6acb0;
  border-radius: 4px;
}
</style>
