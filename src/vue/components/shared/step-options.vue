<template>
  <Transition>
    <div
      v-if="step === index"
      class="relative h-full bg-gray-600 configurator-options__steps"
      :class="step === 1 ? 'configurator-options__steps--active' : ''"
    >
      <StepHeader @back="$emit('back')" :name="option.name" />
      <StepFooter
        @next="$emit('next')"
        @back="$emit('back')"
        class="bg-white"
        :step="step"
      />
      <MessageOptions
        :options="option.options"
        v-if="option.category === 'Message Options'"
      />
      <PersonalizationOption v-if="option.category === 'Personalization'" />
      <LogoArtwork v-if="option.category === 'logo'" />
      <StepApproval v-if="option.category === 'approval'" />
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
export default {
  components: {
    StepHeader,
    StepFooter,
    MessageOptions,
    PersonalizationOption,
    LogoArtwork,
    StepApproval,
  },
  props: {
    step: Number,
    index: Number,
    option: Object,
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
