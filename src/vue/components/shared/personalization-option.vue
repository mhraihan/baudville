<template>
  <DivContainer>
    <div
      class="px-0 pt-2 pb-4 mb-4 border-b border-teal-200 configurator-step__description"
    >
      <div>Personalization is free for this item</div>
    </div>
    <div class="pb-12 configurator-personalizations">
      <div class="configurator-personalizations__toggle">
        <div class="flex items-center mb-4 button-property">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              type="radio"
              id="personalization[no]"
              name="personalization-toggle"
              :value="false"
              v-model="personalization"
            />
          </div>
          <label
            for="personalization[no]"
            class="text-sm font-bold button-property__name"
            ><span class="button-property__text"
              >No Personalization</span
            ></label
          >
        </div>
        <div class="flex items-center mb-4 button-property">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              type="radio"
              id="personalization[yes]"
              name="personalization[yes]"
              v-model="personalization"
              :value="true"
            />
          </div>
          <label
            for="personalization[yes]"
            class="text-sm font-bold button-property__name"
            ><span class="button-property__text"
              >Personalization - Enter text below</span
            ></label
          >
        </div>
      </div>
      <div
        v-if="personalization"
        class="configurator-personalizations__property property configurator-personalizations__property--lineText"
        index="0"
      >
        <PriceTable />
        <p class="flex justify-end configurator-personalizations__add-quantity">
          <button class="tracking-wide button button-product font-bn !text-xl">
            + Add Another
          </button>
        </p>
        <div
          class="pt-4 mt-4 border-t border-teal-200 configurator-quantity-group configurator-quantity-group--is-active"
        >
          <div
            class="flex items-center mb-4 configurator-quantity-group__header"
          >
            <h3
              class="heading heading--6 heading--center configurator-quantity-group__name hidden !text-xl font-bold leading-none flex-col !mb-0"
            >
              <span class="text-gray-100">Item 1</span>
              <span class="text-base">(Edit)</span>
            </h3>
            <div class="ml-4">
              <span class="pr-1 font-medium font-capitalize">Line 1:</span>
              <span class="font-medium font-capitalize">Awarded To</span>
            </div>
          </div>
          <div class="configurator-quantity-group__inputs">
            <div class="flex w-full mb-4" v-for="i in 3" :key="i">
              <label for="line1" class="w-24 py-2 text-sm font-bold"
                ><span class="property__text">Line {{ i }}</span></label
              >
              <div class="flex flex-col w-full px-2">
                <input
                  type="text"
                  id="line1"
                  name="line1"
                  maxlength="26"
                  class="w-full h-12 px-3 py-1 border border-gray-400 rounded"
                />
                <p>26 characters remaining</p>
              </div>
            </div>
          </div>
          <div class="hidden configurator-quantity-group__actions">
            <button disabled="disabled" class="button button--secondary">
              - Remove
            </button>
            <p>This product has a minimum quantity of 1</p>
          </div>
        </div>
      </div>
    </div>
  </DivContainer>
</template>
<script>
import { ref } from "vue";
import DivContainer from "./div-container.vue";
import PriceTable from "./price-table.vue";

export default {
  props: {},
  setup() {
    const personalization = ref(true);
    return {
      personalization,
    };
  },
  components: { DivContainer, PriceTable },
};
</script>
<style scoped>
.configurator-quantity-group--is-active .configurator-quantity-group__name {
  display: flex;
}
</style>
