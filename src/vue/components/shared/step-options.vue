<template>
  <Transition>
    <div
      v-if="step === index"
      class="relative h-full bg-gray-600 configurator-options__steps"
      :class="step === 1 ? 'configurator-options__steps--active' : ''"
    >
      <StepHeader :name="option.name" @back="$emit('back')" />
      <StepFooter
        class="bg-white"
        :step="step"
        :totalSteps="totalSteps"
        @next="$emit('next')"
        @back="$emit('back')"
        @addCart="$emit('add-cart')"
      />
      <MessageOptions
        v-if="option.category === 'Message Options'"
        :options="option.options"
        :type="option.type"
      />
      <PersonalizationOption
        v-if="option.category === 'Personalization'"
        :lines="option.lines"
        :fonts="option?.fonts || {}"
        :price="price || false"
        :verses="option?.verses || {}"
      />
      <ColorsOptions v-if="option.category === 'Color'" :option="option" />
      <LogoArtwork v-if="option.category === 'logo'" />
      <StepApproval
        v-if="option.category === 'approval'"
        :price="price || false"
      />
    </div>
  </Transition>
</template>

<script>
import StepHeader from "./step-header.vue";
import StepFooter from "./step-footer.vue";
import MessageOptions from "./message-options.vue";
import PersonalizationOption from "./personalization-option.vue";
import LogoArtwork from "./logo-artwork.vue";
import StepApproval from "./step-approval.vue";
import ColorsOptions from "./colors-options.vue";
export default {
  components: {
    StepHeader,
    StepFooter,
    MessageOptions,
    PersonalizationOption,
    LogoArtwork,
    StepApproval,
    ColorsOptions,
  },
  props: {
    step: Number,
    totalSteps: {
      type: Number,
      required: true,
    },
    index: Number,
    option: Object,
    price: Boolean,
  },
};
</script>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active {
  transition: transform 0.3s ease;
  transform: translateX(0%);
}
.v-leave-active {
  display: none;
}
.v-enter-from {
  transform: translateX(100%);
}
.v-leave-to {
  display: none;
}
</style>
