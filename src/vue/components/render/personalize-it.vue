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
          :totalSteps="personalization.steps.length"
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
    const templateColor = computed(() => store.getters.getTemplateColor);
    const font = computed(() => store.getters.getFont);
    const fontSize = computed(() => store.getters.getFontSize);
    const items = computed(() => store.getters.getItems);
    const activeLayout = computed(() => store.getters.getLayout);
    const verseText = computed(() => store.getters.getVerse);
    const step = ref(0);

    const personalization = ref({
      steps: [
        {
          name: "Choose Logo Imprint Color",
          category: "Color",
          colors: [
            {
              name: "White",
              value: "White",
              hex_value: "FFFFFF",
            },
            {
              name: "Black",
              value: "Black",
              hex_value: "000000",
            },
            {
              name: "Blue",
              value: "Blue",
              hex_value: "0047BA",
            },
            {
              name: "Bordeaux",
              value: "Bordeaux",
              hex_value: "84344E",
            },
            {
              name: "Brilliant Green",
              value: "Brilliant Green",
              hex_value: "00B398",
            },
            {
              name: "Brown",
              value: "Brown",
              hex_value: "6B3F22",
            },
            {
              name: "Dark Blue",
              value: "Dark Blue",
              hex_value: "001E62",
            },
            {
              name: "Dark Purple",
              value: "Dark Purple",
              hex_value: "5C068C",
            },
            {
              name: "Dark Red",
              value: "Dark Red",
              hex_value: "C2002F",
            },
            {
              name: "Dark Yellow",
              value: "Dark Yellow",
              hex_value: "FFB718",
            },
            {
              name: "Forest Green",
              value: "Forest Green",
              hex_value: "006547",
            },
            {
              name: "Light Green",
              value: "Light Green",
              hex_value: "00953A",
            },
            {
              name: "Light Red",
              value: "Light Red",
              hex_value: "E2231A",
            },
            {
              name: "Light Yellow",
              value: "Light Yellow",
              hex_value: "F8E946",
            },
            {
              name: "Marine Blue",
              value: "Marine Blue",
              hex_value: "0055B7",
            },
            {
              name: "Medium Blue",
              value: "Medium Blue",
              hex_value: "002F6C",
            },
            {
              name: "Medium Red",
              value: "Medium Red",
              hex_value: "CF0A2C",
            },
            {
              name: "Medium Yellow",
              value: "Medium Yellow",
              hex_value: "FFCD00",
            },
            {
              name: "Metallic Gold",
              value: "Metallic Gold",
              hex_value: "86754F",
            },
            {
              name: "Mustard Yellow",
              value: "Mustard Yellow",
              hex_value: "F1B434",
            },
            {
              name: "Orange",
              value: "Orange",
              hex_value: "FF661B",
            },
            {
              name: "Pink",
              value: "Pink",
              hex_value: "E45DBF",
            },
            {
              name: "Silver",
              value: "Silver",
              hex_value: "8B8C8D",
            },
            {
              name: "Turquoise",
              value: "Turquoise",
              hex_value: "00ABC7",
            },
          ],
        },
        {
          name: "Add Logo",
          category: "logo",
          logo: {
            message:
              '<p>\n  <span class=\'heading heading--5 heading--inline-block\'>Add your logo or artwork</span>\n  <span class=\'heading heading--secondary-color heading--inline-block heading--base-font-family heading--base-font-size heading--font-weight\'>(Optional)</span>\n</p>\n<p>Customize with your organization&#39;s logo or graphic. Minimum $35 setup fee; free with orders over $100!<a href="{specs_path}" target="_blank" class="configurator-step__description-help-button text-button">Read Artwork Specifications</a></p>\n<p>\n  <small>\n    Preferred File Type: .eps, .ai, .pdf\n    <br>\n    Other accepted file types MUST BE at least 4in x 4in and 300dpi .psd, .png, .jpg\n  </small>\n</p>\n<p>\n  <small>\n    For best results on your logo reproductions, use a black and white logo graphic.\n  </small>\n</p>\n<p>\n  <small>\n Please wait for your logo to be fully uploaded before proceeding to the next step. A check mark will appear and your logo will be placed on the product to indicate your upload is complete. \n </small>\n</p>',
          },
        },
        {
          name: "Finalize Details",
          category: "approval",
          notes: {
            message:
              "Enter any special instructions you have for your item(s) in the box below. If you have a due date for your order, please enter it here. Please note: as it is our busy season, we cannot guarantee due dates, but we will always try our best!",
          },
        },
      ],
      show_clipart_button: false,
      images: [
        {
          name: "FRONT",
          value: "BV_50061BK_BACK",
          default: true,
          template: false,
        },
        {
          name: "TEMPLATE",
          value: "BV_50061_TEMP",
          default: false,
          template: true,
        },
      ],
      customization_options: "Promotional items that spark brand love!",
      customization_message:
        "Create a buzz around your brand with gifts and gear that reflects who you are. Simply choose your imprint color and add your logo for instant brand power!",
      lets_get_started: "Lets Get Started!",
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
      if (artwork.value?.image_path) {
        imageTemplate.TEMPLATE += "L";
      }
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

      src += `&layer=0&src=is{Baudville/${imageTemplate.FRONT}}&layer=1&hide=0&op_colorize=${templateColor.value}`;
      if (scene7Id.value) {
        src += `&src=is{Baudville/${scene7Id.value}}`;
      }
      src += `&layer=2&op_colorize=${templateColor.value}`;
      if (artwork.value?.image_path) {
        src += `&layer=3&src=is{${artwork.value?.image_path}}`;
      } else {
        src += `&layer=3`;
      }

      src += `&op_colorize=${templateColor.value}&layer=4&op_colorize=${templateColor.value}`;

      if (emblem.value) {
        src += `&layer=5&src=is{Baudville/${emblem.value}}&op_colorize=${templateColor.value}`;
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
      templateColor,
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

    const colors = filter(this.personalization.steps, ["category", "Color"])[0];

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

    if (this.personalization?.template_color) {
      store.dispatch("saveTemplateColor", this.personalization.template_color);
    }

    if (colors?.colors?.length) {
      store.dispatch("saveTemplateColor", colors.colors[0].hex_value);
    }

    if (this.personalization.scene7Id) {
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
        const setting = filter(options[0]?.options[0]?.settings, [
          "default",
          true,
        ])[0];
        store.dispatch("saveScene7Id", setting.value);
      }
    }
  },
};
</script>
