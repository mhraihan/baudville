<template>
  <div class="container relative mx-auto my-6">
    <div class="flex border border-teal-100">
      <div class="w-7/12 px-12">
        <img :src="url" alt="" />
      </div>
      <div class="w-5/12 border-l border-teal-100">
        <div v-if="step === 0">
          <div class="p-4 text-center">
            <h3 class="mb-2 text-3xl font-bn">Personalization Options</h3>
            <p class="mb-3 text-sm font-semibold">
              Personalize your gift by adding a specially curated Baudville
              graphic sentiment, your company logo, and/or your own personal
              message.
            </p>
            <h3 class="text-3xl font-bn">Lets Get Started!</h3>
          </div>

          <StepButton
            v-for="(info, index) in steps"
            @stepChange="step = step + index + 1"
            :key="index"
            :step_number="index + 1"
            :name="info.name"
          />
        </div>
        <StepOptions
          v-for="(option, index) in steps"
          :index="index + 1"
          :step="step"
          :key="index"
          :option="option"
          @back="step = 0"
          @next="step = step + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import StepButton from "../shared/step-button.vue";
import StepOptions from "../shared/step-options.vue";
export default {
  components: {
    StepButton,
    StepOptions,
  },

  setup() {
    const steps = reactive([
      {
        name: "Message Options",
        category: "Message Options",
        options: [
          {
            field: null,
            id: 1,
            label: "Choose Your Sentiment",
            max_char: null,
            max_char_big: null,
            settings: [
              {
                field: "76184_X32",
                id: 1,
                name: "My Hero",
                option_id: 1,
                content:
                  "Presented To<br/>\n                LINE 1 TEXT HERE<br/>\n                Thank You For Everything You Do; For Rising To The Occasion, For Putting Others Before Yourself, For Your Commitment To Your Community. You Are Nothing Short Of A Hero. <br/>\n                LINE 2 TEXT HERE<br/>\n                LINE 3 TEXT HERE",
              },
              {
                content:
                  "Awarded To<br/>\n                LINE 1 TEXT HERE<br/>\n                You Always Bring Positive Energy To The Office, And Your Talent And Hard Work Is An Inspiration To Everyone Around You. You?Re A Continuous Example Of What It Means To Be An Amazing Team Member. Thank You For Bringing The Awesome.<br/>\n                LINE 2 TEXT HERE<br/>\n                LINE 3 TEXT HERE",

                field: "76184_X42",
                id: 2,
                name: "Officially Awesome",
                option_id: 1,
              },
            ],
            step_id: 1,
            style: "default",
            type: 1,
          },
        ],
      },
      {
        name: "Personalization",
        category: "Personalization",
      },
      {
        name: "Add Logo or Artwork",
        category: "logo",
      },
      {
        name: "Approval",
        category: "approval",
      },
    ]);
    const step = ref(0);
    const current = ref(null);
    const url = ref(
      "https://s7d7.scene7.com/is/image/Baudville/BV_94213_TEMP?$fn=&$line1=4111111&$line1fs=96&$line2=75555&$line2fs=96&$line3=222228&$line3fs=96&$line4=&$line5=&$line6=&$linelp=&layer=0&src=is{Baudville/BV_94213_FRONT}&layer=1&hide=0&op_colorize=FFFFFF&src=is{Baudville/76517_X31}&layer=2&op_colorize=FFFFFF&layer=3&op_colorize=FFFFFF&layer=4&op_colorize=FFFFFF"
    );
    const sentiment = ref(null);
    const customizations = ref([]);
    const customization = ref({
      sentiment: "",
      lines: [
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
        {
          line: "",
          size: "",
          bigSize: "",
          bigActive: false,
        },
      ],
    });
    const dropzoneOptions = ref({
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      addRemoveLinks: true,
      headers: { "My-Awesome-Header": "header value" },
    });

    const sentimentChange = () => {
      this.customization.sentiment = this.sentiment.field;
      this.dynamicImage();
    };
    return {
      step,
      steps,
      current,
      url,
      sentiment,
      customizations,
      customization,
      dropzoneOptions,
    };
  },
};
</script>
