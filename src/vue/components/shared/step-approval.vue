<template>
  <DivContainer>
    <p class="mb-2 font-bold">
      Enter any special instructions you have for your item(s) in the box below.
      If you have a due date for your order, please enter it here. Please note:
      as it is our busy season, we cannot guarantee due dates, but we will
      always try our best!
    </p>
    <label class="block w-full my-2 text-sm font-bold" for="instructions"
      >Special Instructions</label
    >
    <textarea
      id="instructions"
      name="instructions"
      data="instructions"
      v-model="instructions"
      class="w-full h-12 px-3 py-1 border border-gray-400 rounded"
    ></textarea>
    <PriceTable />
    <div class="my-4 configurator-text-input" index="2">
      <label for="quantity" class="block mb-2 text-sm font-bold"
        ><span class="property__text">Quantity</span></label
      >
      <div class="value">
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          v-model="qty"
          class="w-20 h-8 px-1 text-xl font-bold text-center rounded font-bn"
        />
      </div>
    </div>
    <div class="my-4 capitalize" index="3">
      <div class="pb-2 text-sm font-bold normal-case">
        <span class="property__text"
          >If you added a logo or custom graphic, you will be sent a proof to
          your inbox with instructions on approval there. If you did not add a
          logo or custom graphic this is your FINAL proof. Please initial to
          approve your order online.</span
        >
      </div>
      <div class="flex w-full mb-4">
        <label for="line1" class="w-24 py-2 text-sm font-bold"
          ><span class="property__text">Sign-Off</span></label
        >
        <div class="flex flex-col w-full px-2">
          <input
            type="text"
            id="line1"
            name="line1"
            maxlength="26"
            v-model="line"
            class="w-full h-12 px-3 py-1 border border-gray-400 rounded"
          />
        </div>
      </div>
    </div>
  </DivContainer>
</template>
<script>
import DivContainer from "./div-container.vue";
import { ref } from "vue";
import PriceTable from "./price-table.vue";

export default {
  components: { DivContainer, PriceTable },
  setup() {
    const instructions = ref();
    const line = ref();
    const qty = ref(1);
    return {
      instructions,
      qty,
      line,
    };
  },
};
</script>
