<template>
  <div class="container relative mx-auto my-6">
    <div class="flex border border-teal-100">
      <div class="w-7/12 px-12" :class="loading && 'opacity-50'">
        <img :src="url" alt="" :class="loading && 'opacity-50'" />
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
            v-for="(info, index) in personalization.steps"
            :key="index"
            :step_number="index + 1"
            :name="info.name"
            @stepChange="step = step + index + 1"
          />
        </div>
        <StepOptions
          v-for="(option, index) in personalization.steps"
          :key="index"
          :index="index + 1"
          :step="step"
          :option="option"
          :url="url"
          @addCart="addCart"
          @back="step = 0"
          @next="step = step + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { pickBy, filter, each } from "lodash";
import { useStore } from "vuex";
import { ref, computed, toRefs, watch } from "vue";
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
    variant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { image, variant } = toRefs(props);

    const loading = ref(false);
    const scene7Id = computed(() => store.getters.getScene7Id);
    const emblem = computed(() => store.getters.getEmblem);
    const artwork = computed(() => store.getters.getArtwork);
    const font = computed(() => store.getters.getFont);
    const fontSize = computed(() => store.getters.getFontSize);
    const items = computed(() => store.getters.getItems);
    const activeLayout = computed(() => store.getters.getLayout);
    const verseText = computed(() => store.getters.getVerse);
    const step = ref(0);

    const personalization = ref({
      steps: [
        {
          name: "Message Options",
          type: "select",
          category: "Message Options",
          options: [
            {
              id: 1,
              label: "Choose Your Sentiment",
              category: "sentiment",
              settings: [
                {
                  name: "Above and Beyond - Formal",
                  layouts: [
                    { layout: "L", value: "35237_SCRIPT_AB" },
                    { layout: "P", value: "71159_SCRIPT_AB" },
                  ],
                  default: false,
                },
                {
                  name: "Above and Beyond - Fun",
                  layouts: [
                    { layout: "L", value: "35237_CARTWHEEL_AB" },
                    { layout: "P", value: "71159_CARTWHEEL_AB" },
                  ],
                  default: false,
                },
                {
                  name: "Above and Beyond - Informal",
                  layouts: [
                    { layout: "L", value: "35237_BLAZE_AB" },
                    { layout: "P", value: "71159_BLAZE_AB" },
                  ],
                  default: true,
                },
                {
                  name: "Achievement - Classic",
                  layouts: [
                    { layout: "L", value: "35237_BANNER_ACHIEV" },
                    { layout: "P", value: "71159_BANNER_ACHIEV" },
                  ],
                  default: false,
                },
                {
                  name: "Achievement - Formal",
                  layouts: [
                    { layout: "L", value: "35237_SCRIPT_ACHIEVE" },
                    { layout: "P", value: "71159_SCRIPT_ACHIEVE" },
                  ],
                  default: false,
                },
                {
                  name: "Achievement - Informal",
                  layouts: [
                    { layout: "L", value: "35237_BLAZE_ACHIEV" },
                    { layout: "P", value: "71159_BLAZE_ACHIEV" },
                  ],
                  default: false,
                },
              ],
            },
            {
              id: 2,
              label: "Choose An Emblem",
              category: "emblem",
              settings: [
                {
                  name: "Apple Star",
                  layouts: [
                    { layout: "L", value: "35237_APPLESTAR" },
                    { layout: "P", value: "71159_APPLESTAR" },
                  ],
                  default: false,
                },
                {
                  name: "Cadusceus",
                  layouts: [
                    { layout: "L", value: "35237_CADUSCEUS" },
                    { layout: "P", value: "71159_CADUSCEUS" },
                  ],
                  default: false,
                },
                {
                  name: "Cross",
                  layouts: [
                    { layout: "L", value: "35237_CROSS" },
                    { layout: "P", value: "71159_CROSS" },
                  ],
                  default: false,
                },
                {
                  name: "Eagle",
                  layouts: [
                    { layout: "L", value: "35237_EAGLE1" },
                    { layout: "P", value: "71159_EAGLE1" },
                  ],
                  default: false,
                },
                {
                  name: "Winning Team",
                  layouts: [
                    { layout: "L", value: "35237_WINTEAM" },
                    { layout: "P", value: "71159_WINTEAM" },
                  ],
                  default: false,
                },
                {
                  name: "You Make the Difference",
                  layouts: [
                    { layout: "L", value: "35237_YMTD" },
                    { layout: "P", value: "71159_YMTD" },
                  ],
                  default: false,
                },
                {
                  name: "No Graphic",
                  layouts: [
                    { layout: "P", value: "NOGRAPHIC" },
                    { layout: "L", value: "NOGRAPHIC" },
                  ],
                  default: true,
                },
              ],
            },
          ],
        },
        {
          name: "Personalization",
          category: "Personalization",
          show_price: false,
          lines: [
            {
              active_only_if_no_graphic: false,
              default: "Awarded To",
              placeholder: "",
              layouts: {
                L: {
                  character_limit: 65,
                  font_size: 80,
                },
                P: { character_limit: 50, font_size: 80 },
              },
            },
            {
              default: "",
              placeholder: "Recipient's name",
              layouts: {
                L: {
                  character_limit: 40,
                  font_size: 128,
                },
                P: { character_limit: 30, font_size: 128 },
              },

              active_only_if_no_graphic: false,
            },
          ],
          fonts: [
            {
              value: "Times New Roman",
              name: "Times New Roman (more formal)",
              default: true,
            },
            {
              value: "Myriad Pro",
              name: "Myriad (less formal)",
              default: false,
            },
          ],
          verses: [
            {
              name: "Customer Service 1",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for outstanding service and dedication. \r\nThank you for continuing our tradition of excellence. \r\nYou are our shining star!",
                },
                {
                  layout: "P",
                  value:
                    "for outstanding service and dedication. \r\nThank you for continuing our tradition \r\nof excellence. You are our shining star!",
                },
              ],
              default: false,
            },
            {
              name: "Customer Service 2",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for exemplary service in all aspects of the customer experience. \r\nYour knowledge and dependability set you apart from the rest. \r\nYou Make the Difference!",
                },
                {
                  layout: "P",
                  value:
                    "for exemplary service in all aspects \r\nof the customer experience. Your knowledge \r\nand dependability set you apart from the rest. \r\nYou Make the Difference!",
                },
              ],
              default: false,
            },
            {
              name: "Excellence 1",
              layouts: [
                {
                  layout: "L",
                  value:
                    "in grateful appreciation and distinguished \r\nrecognition of your hard work, devotion\r\nand commitment to excellence.",
                },
                {
                  layout: "P",
                  value:
                    "in grateful appreciation and \r\ndistinguished recognition of \r\nyour hard work, devotion and \r\ncommitment to excellence.",
                },
              ],
              default: false,
            },
            {
              name: "Excellence 2",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for reaching the pinnacle of success, \r\nmaking yourself a true shining example \r\nof the principles for which we stand.",
                },
                {
                  layout: "P",
                  value:
                    "for reaching the pinnacle of success, \r\nmaking yourself a true shining example \r\nof the principles for which we stand.",
                },
              ],
              default: false,
            },
            {
              name: "Excellence 3",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for consistently producing at the highest levels, \r\nclearly marking yourself as an achiever of excellence.",
                },
                {
                  layout: "P",
                  value:
                    "for consistently producing at the \r\nhighest levels, clearly marking yourself \r\nas an achiever of excellence.",
                },
              ],
              default: false,
            },
            {
              name: "Excellence 4",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for demonstrating excellence \r\nand inspiring others to perform at their best. \r\nWe are a better team because of you!",
                },
                {
                  layout: "P",
                  value:
                    "for demonstrating excellence \r\nand inspiring others to perform at their best.\r\nWe are a better team because of you!",
                },
              ],
              default: false,
            },
            {
              name: "Leadership 1",
              layouts: [
                {
                  layout: "L",
                  value:
                    "in recognition of your superior leadership.\r\nYou set and reach professional goals,\r\ndirecting the team to ultimate success.",
                },
                {
                  layout: "P",
                  value:
                    "in recognition of your superior leadership.\r\nYou set and reach professional goals, \r\ndirecting the team to ultimate success.",
                },
              ],
              default: false,
            },
            {
              name: "Performance 1",
              layouts: [
                {
                  layout: "L",
                  value:
                    "in acknowledgement of your exceptional\r\naccomplishments and outstanding performance. \r\nYour achievements are noteworthy and have inspired us all.",
                },
                {
                  layout: "P",
                  value:
                    "in acknowledgement of your exceptional\r\naccomplishments and outstanding \r\nperformance. Your achievements are\r\nnoteworthy and have inspired us all.",
                },
              ],
              default: false,
            },
            {
              name: "Performance 2",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for a truly superior and outstanding achievement. \r\nYour excellent performance has set a new high standard\r\nfor everyone to strive toward. Congratulations from us all!",
                },
                {
                  layout: "P",
                  value:
                    "for a truly superior and outstanding achievement.\r\nYour excellent performance has set a new high\r\nstandard for everyone to strive toward. \r\nCongratulations from us all!",
                },
              ],
              default: false,
            },
            {
              name: "Performance 3",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for meeting and exceeding all standards. \r\nWe commend you on your top quality performance \r\nand thank you for always reaching above and beyond.",
                },
                {
                  layout: "P",
                  value:
                    "for meeting and exceeding all standards. \r\nWe commend you on your top quality\r\nperformance and thank you for always \r\nreaching above and beyond.",
                },
              ],
              default: false,
            },
            {
              name: "Performance 4",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for an absolutely outstanding performance. \r\nYour efforts have been diligent, resulting in shining success. \r\nCongratulations on a job well done!",
                },
                {
                  layout: "P",
                  value:
                    "for an absolutely outstanding \r\nperformance. Your efforts have been diligent,\r\nresulting in shining success. \r\nCongratulations on a job well done!",
                },
              ],
              default: false,
            },
            {
              name: "Years of Service 1",
              layouts: [
                {
                  layout: "L",
                  value:
                    "in recognition of your dedication and \r\nloyalty for so many years. \r\nYour allegiance has made a lasting impression \r\nand sets a new standard of excellence.",
                },
                {
                  layout: "P",
                  value:
                    "in recognition of your dedication and \r\nloyalty for so many years. \r\nYour allegiance has made a lasting impression \r\nand sets a new standard of excellence.",
                },
              ],
              default: false,
            },
            {
              name: "Years of Service 2",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for your dedicated years of outstanding service\r\nand commitment. Thank you for everything you have done. \r\nYou truly make a difference.",
                },
                {
                  layout: "P",
                  value:
                    "for your dedicated years of outstanding \r\nservice and commitment. Thank you for everything \r\nyou have done. You truly make a difference.",
                },
              ],
              default: false,
            },
            {
              name: "Years of Service 3",
              layouts: [
                {
                  layout: "L",
                  value:
                    "for your loyal dedication and unwavering\r\ncommitment. Thank you for contributing to our \r\ngoals, helping our organization stand above the rest.",
                },
                {
                  layout: "P",
                  value:
                    "for your loyal dedication and unwavering \r\ncommitment. Thank you for your \r\noutstanding contributions toward our goals, \r\nand for making our organization \r\nstand above the rest.",
                },
              ],
              default: false,
            },
            {
              name: "Custom Verse",
              layouts: [
                { layout: "L", value: "" },
                { layout: "P", value: "" },
              ],
              default: true,
            },
          ],
        },
        {
          name: "Add Logo or Artwork",
          category: "logo",
          logo: {
            message:
              '<p>\n  <span class=\'heading heading--5 heading--inline-block\'>Add your logo or artwork</span>\n  <span class=\'heading heading--secondary-color heading--inline-block heading--base-font-family heading--base-font-size heading--font-weight\'>(Optional)</span>\n</p>\n<p>Customize with your organization&#39;s logo or graphic. Minimum $35 setup fee; free with orders over $100!<a href="{specs_path}" target="_blank" class="configurator-step__description-help-button text-button">Read Artwork Specifications</a></p>\n<p>\n  <small>\n    Preferred File Type: .eps, .ai, .pdf\n    <br>\n    Other accepted file types MUST BE at least 4in x 4in and 300dpi .psd, .png, .jpg\n  </small>\n</p>\n<p>\n  <small>\n    For best results on your logo reproductions, use a black and white logo graphic.\n  </small>\n</p>\n<p>\n  <small>\n Please wait for your logo to be fully uploaded before proceeding to the next step. A check mark will appear and your logo will be placed on the product to indicate your upload is complete. \n </small>\n</p>',
          },
        },
        {
          name: "Approval",
          category: "approval",
          notes: {
            message:
              "Enter any special instructions you have for your item(s) in the box below. If you have a due date for your order, please enter it here. Please note: as it is our busy season, we cannot guarantee due dates, but we will always try our best!",
          },
        },
      ],
      template_color: "DCBB78",
      show_clipart_button: false,
      images: [
        {
          name: "FRONT",
          layouts: [
            { layout: "L", value: "BV_35237BKL_FRONT" },
            { layout: "P", value: "BV_35237BK_FRONT" },
          ],
          default: true,
          template: false,
        },
        {
          name: "TEMPLATE",
          layouts: [
            { layout: "L", value: "BV_35237LG_TEMP" },
            { layout: "P", value: "BV_35237PG_TEMP" },
          ],
          default: false,
          template: true,
        },
      ],
      layouts: [
        { value: "L", name: "Landscape", default: true },
        { value: "P", name: "Portrait", default: false },
      ],
      customization_options: "Personalization Options",
      customization_message:
        "Personalize your gift by adding a specially curated Baudville graphic sentiment, your company logo, and/or your own personal message.",
      lets_get_started: "Lets Get Started!",
      colors: [],
      due_date: [],
      text: [],
    });

    const url = ref(image.value);

    const dynamicImage = (line) => {
      const imageTemplate = {
        FRONT: activeLayout.value
          ? filter(personalization.value.images[0].layouts, [
              "layout",
              activeLayout.value,
            ])[0]?.value
          : personalization.value.images[0].value,
        TEMPLATE: activeLayout.value
          ? filter(personalization.value.images[1].layouts, [
              "layout",
              activeLayout.value,
            ])[0]?.value
          : personalization.value.images[1].value,
      };

      let src = `https://s7d7.scene7.com/is/image/Baudville/${
        imageTemplate.TEMPLATE
      }?$fn=${font.value && font.value}&$line1=${line.line1}&$line1fs=${
        fontSize.value[0] || 80
      }&$line2=${line.line2}&$line2fs=${fontSize.value[1] || 128}&$line3=${
        line.line3
      }&$line3fs=${fontSize.value[2] || 80}&$line4=${line.line4}&$line5=${
        line.line5
      }&$line6=${line.line6}&$linelp=`;

      if (verseText.value) {
        src += `&$verse_fs=72&$verse_text=${encodeURI(
          verseText.value
        ).replaceAll("%0D%0A", "%0D\\par%0A")}`; // new line does not work, need to replace
      }

      src += `&layer=0&src=is{Baudville/${imageTemplate.FRONT}}&layer=1&hide=0&op_colorize=${personalization.value.template_color}&src=is{Baudville/${scene7Id.value}}&layer=2&op_colorize=${personalization.value.template_color}`;

      if (artwork.value?.image_path) {
        src += `&layer=3&src=is{${artwork.value?.image_path}}`;
      } else {
        src += `&layer=3`;
      }

      src += `&op_colorize=${personalization.value.template_color}&layer=4&op_colorize=${personalization.value.template_color}`;

      if (emblem.value) {
        src += `&layer=5&src=is{Baudville/${emblem.value}}&op_colorize=${personalization.value.template_color}`;
      }

      loading.value = false;
      return src;
    };
    const addCart = () => {
      const signOff = ref(store.getters.signOff);
      if (!signOff.value?.length) {
        store.dispatch("saveSignOffEror", true);
      }
      if (variant.value.available && signOff.value?.length) {
        store.dispatch("saveSignOffEror", false);
        let formData = {
          items: [
            {
              quantity: store.getters.getItemSize + 1,
              id: variant.value.id,
              properties: {
                image: url.value,
                instructions: store.getters.instructions,
                signOff: signOff?.value,
                Personalization: items.value,
              },
            },
          ],
        };

        fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            console.log(data);
            // await Shopify.onItemAdded().then(() => {
            //   this.loading = false;
            // });

            // this.resetData();
            // window.location = "/cart";
            alert("Product added to the cart successfully!");
          })
          .catch((error) => {
            console.error("Error:", error);
            // this.errors();
          });
      } else {
        // alert("Product is not available");
      }
    };
    const watcher = [
      scene7Id,
      emblem,
      items.value,
      artwork,
      activeLayout,
      font,
      verseText,
    ];

    watch(watcher, () => {
      loading.value = true;
      const key = store.getters.getActiveIndex;
      url.value = dynamicImage(store.getters.getItemById(key));
    });
    return {
      step,
      personalization,
      loading,
      url,
      addCart,
    };
  },
  mounted() {
    const store = useStore();
    const options = pickBy(this.personalization.steps, {
      category: "Message Options",
    });
    const personalization = filter(this.personalization.steps, [
      "category",
      "Personalization",
    ])[0];

    const fonts = personalization?.fonts;
    if (fonts?.length) {
      store.dispatch("saveFont", filter(fonts, ["default", true])[0]?.value);
    }
    const lines = personalization?.lines;
    if (lines?.length) {
      const items = {};
      const font_size = [];
      each(lines, (line, index) => {
        items[`line${index + 1}`] = line?.default || "";
        font_size.push(
          line?.font_size || Object.values(line.layouts)[0]?.font_size
        );
      });

      store.dispatch("saveFontSize", font_size);
      store.dispatch("updateItem", {
        item: items,
        index: 0,
      });
    }

    if (this.personalization.layouts) {
      const layout = pickBy(this.personalization.layouts, {
        default: true,
      });

      store.dispatch("saveLayout", layout[0].value);
      store.dispatch(
        "saveEmblem",
        options[0].options[1].settings
          .filter((s) => s.default)
          .map((s) => s.layouts)
          .flat()
          .filter((s) => s.layout === layout[0].value)[0].value
      );
      store.dispatch(
        "saveScene7Id",
        options[0].options[0].settings
          .filter((s) => s.default)
          .map((s) => s.layouts)
          .flat()
          .filter((s) => s.layout === layout[0].value)[0].value
      );
    } else {
      const setting = filter(options[0].options[0].settings, [
        "default",
        true,
      ])[0];
      store.dispatch("saveScene7Id", setting.value);
    }
  },
};
</script>
