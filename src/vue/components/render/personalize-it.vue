<template>
  <div class="container relative mx-auto my-6">
    <div class="flex border border-teal-100">
      <div class="w-7/12 px-12">
        <img :src="url" alt="" />
      </div>
      <div class="w-5/12 border-l border-teal-100">
        <div v-if="step === 0">
          <div class="p-4 text-center">
            <h3 class="mb-2 text-3xl font-bn">
              {{ personalization.customization_options }}
            </h3>
            <p class="mb-3 text-sm font-semibold">
              {{ personalization.customization_message }}
            </p>
            <h3 class="text-3xl font-bn">
              {{ personalization.lets_get_started }}
            </h3>
          </div>

          <StepButton
            v-for="(info, index) in steps"
            :key="index"
            :step_number="index + 1"
            :name="info.name"
            @stepChange="step = step + index + 1"
          />
        </div>
        <StepOptions
          v-for="(option, index) in steps"
          :key="index"
          :index="index + 1"
          :step="step"
          :option="option"
          @back="step = 0"
          @next="step = step + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, reactive, toRefs, watch } from "vue";
import StepButton from "../shared/step-button.vue";
import StepOptions from "../shared/step-options.vue";
export default {
  components: {
    StepButton,
    StepOptions,
  },
  props: {
    image: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    const { image } = toRefs(props);

    const scene7Id = computed(() => store.getters.getScene7Id);

    const personalization = ref({
      steps: {
        logo: {
          message:
            '<p>\n  <span class=\'heading heading--5 heading--inline-block\'>Add your logo or artwork</span>\n  <span class=\'heading heading--secondary-color heading--inline-block heading--base-font-family heading--base-font-size heading--font-weight\'>(Optional)</span>\n</p>\n<p>Customize with your organization&#39;s logo or graphic. Minimum $35 setup fee; free with orders over $100!<a href="{specs_path}" target="_blank" class="configurator-step__description-help-button text-button">Read Artwork Specifications</a></p>\n<p>\n  <small>\n    Preferred File Type: .eps, .ai, .pdf\n    <br>\n    Other accepted file types MUST BE at least 4in x 4in and 300dpi .psd, .png, .jpg\n  </small>\n</p>\n<p>\n  <small>\n    For best results on your logo reproductions, use a black and white logo graphic.\n  </small>\n</p>\n<p>\n  <small>\n Please wait for your logo to be fully uploaded before proceeding to the next step. A check mark will appear and your logo will be placed on the product to indicate your upload is complete. \n </small>\n</p>',
        },
        full_customization: [],
        message_options: [],
        title_graphic_categories: [],
        title_graphics: [],
        approval: [],
        notes: {
          message:
            "Enter any special instructions you have for your item(s) in the box below. If you have a due date for your order, please enter it here. Please note: as it is our busy season, we cannot guarantee due dates, but we will always try our best!",
        },
        sign_off: [],
        colors: [],
        due_date: [],
        text: [],
      },
      template_color: "939393",
      show_clipart_button: false,
      images: [
        {
          template: false,
          value: "BV_73545_FRONT",
          name: "FRONT",
          default: true,
        },
        {
          template: true,
          value: "BV_73545_TEMP",
          name: "TEMPLATE",
          default: false,
        },
      ],
      scene7_id: null,
      add_another: [],
      customization_options: "Personalization Options",
      customization_message:
        "Personalize your gift by adding a specially curated Baudville graphic sentiment, your company logo, and/or your own personal message.",
      lets_get_started: "Lets Get Started!",
    });
    const steps = reactive([
      {
        name: "Message Options",
        type: "select",
        category: "Message Options",
        options: [
          {
            id: 1,
            label: "Choose Your Sentiment",
            settings: [
              {
                description:
                  "<p>Awarded To</p><p>LINE 1 TEXT HERE</p><p>for an absolutely exceptional performance. Your efforts have resulted in an impressive achievement. Congratulations on a job well done! <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X02",
                name: "Above and Beyond: Congratulations",
                default: true,
              },
              {
                description:
                  "<p>Awarded To</p><p>LINE 1 TEXT HERE</p><p>for meeting and exceeding the highest standards. Youve surpassed expectations and reached for the stars. <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X01",
                name: "Above and Beyond: Quality Performance",
                default: false,
              },
              {
                description:
                  "<p>Awarded To</p><p>LINE 1 TEXT HERE</p><p>for consistently producing at the highest levels. Youve exhibited great ambition and a drive to excel in all that you do.<br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X04",
                name: "Achievement: Producing at the Highest Level",
                default: false,
              },
              {
                description:
                  "<p>Awarded To</p><p>LINE 1 TEXT HERE</p><p>for a truly extraordinary achievement. Your accomplishments have set an inspiring example. Congratulations on your well-deserved success.<br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X03",
                name: "Achievement: Setting a High Standard",
                default: false,
              },
              {
                description:
                  "<p>Presented To</p><p>LINE 1 TEXT HERE</p><p>Your selfless dedication goes above and beyond hard work. Thank you for the heart you put into your work. Today and every day we recognize the risk you take and the care you give. Thank you. <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X37",
                name: "Amazing Caregiver",
                default: false,
              },
              {
                description:
                  "<p>Presented To</p><p>LINE 1 TEXT HERE</p><p>with gratitude for your significant contributions. Your efforts have made a difference to our organization. Thank you for all you do.   <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X24",
                name: "Appreciation Award",
                default: false,
              },
              {
                description:
                  "<p>Awarded To</p><p>LINE 1 TEXT HERE</p><p>For your outstanding dedication to the performance of our organization's mission and all that we strive for; thank you for your tireless commitment to your team, to your work, and to the values our company is founded on.  <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X44",
                name: "Commitment",
                default: false,
              },
              {
                description:
                  "<p>Presented To</p><p>LINE 1 TEXT HERE</p><p>in recognition of the milestones youve achieved and the accomplishments youve earned. Thank you for giving your time with loyalty and dedication. <br><p>LINE 2 TEXT HERE</p><p>LINE 3 TEXT HERE</p>",
                no_color: false,
                value: "76517_X21",
                name: "Dedicated Service",
                default: false,
              },
            ],
          },
        ],
      },
      {
        name: "Personalization",
        category: "Personalization",
        lines: [
          {
            character_limit: 26,
            font_size: 112,
            active_only_if_no_graphic: false,
          },
          {
            character_limit: 26,
            font_size: 80,
            active_only_if_no_graphic: false,
          },
          {
            character_limit: 26,
            font_size: 80,
            active_only_if_no_graphic: false,
          },
        ],
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
    const step = ref(2);
    const current = ref(null);
    const url = ref(image.value);
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

    const dynamicImage = () => {
      return `https://s7d7.scene7.com/is/image/Baudville/${personalization.value.images[1].value}?$fn=&$line1=&$line1fs=112&$line2=&$line2fs=80&$line3=&$line3fs=80&$line4=&$line5=&$line6=&$linelp=&layer=0&src=is{Baudville/${personalization.value.images[0].value}}&layer=1&hide=0&op_colorize=${personalization.value.template_color}&src=is{Baudville/${scene7Id.value}}&layer=2&op_colorize=${personalization.value.template_color}&layer=3&op_colorize=${personalization.value.template_color}&layer=4&op_colorize=${personalization.value.template_color}`;

      // this.url = `https://s7d7.scene7.com/is/image/Baudville/${this.product.scene7_image_id}?$fn=&$linelp=&layer=0&src=is{Baudville/${this.product.scene7_image_id}}&layer=1&hide=0&op_colorize=939393&src=is{Baudville/${this.customization.sentiment}}&layer=2&op_colorize=939393&layer=3&op_colorize=939393&layer=4&op_colorize=939393`;

      // this.url += `&$line1=${this.customization.lines[0].line}&$line1fs=${this.customization.lines[0].size}`;
      // this.url += `&$line2=${this.customization.lines[1].line}&$line2fs=${this.customization.lines[1].size}`;
      // this.url += `&$line3=${this.customization.lines[2].line}&$line3fs=${this.customization.lines[2].size}`;
      // this.url += `&$line4=${this.customization.lines[3].line}&$line4fs=${this.customization.lines[3].size}`;
      // this.url += `&$line5=${this.customization.lines[4].line}&$line5fs=${this.customization.lines[4].size}`;
      // this.url += `&$line6=${this.customization.lines[5].line}&$line6fs=${this.customization.lines[5].size}`;
    };

    watch([scene7Id], () => {
      url.value = dynamicImage();
    });
    return {
      step,
      steps,
      personalization,
      current,
      url,
      sentiment,
      customizations,
      customization,
    };
  },
  mounted() {
    console.log(this.step); // 0
  },
};
</script>
