<template>
  <DivContainer>
    <h3 class="flex items-end mb-2 text-2xl uppercase">
      Add your logo or artwork
      <span class="mb-1 ml-2 font-sans text-sm normal-case primary-color"
        >(Optional)</span
      >
    </h3>
    <p class="mb-6 font-semibold">
      Customize with your organization's logo or graphic. Minimum $35 setup fee;
      free with orders over $100!
      <a
        target="_blank"
        href="https://www.baudville.com/products/configurator/%7Bspecs_path%7D"
        >Read Artwork Specifications</a
      >
    </p>

    <div class="pb-4 mb-6 text-xs border-b border-teal-200 content">
      <p>Preferred File Type: .eps, .ai, .pdf</p>
      <p class="mt-4">
        Other accepted file types MUST BE at least 4in x 4in and 300dpi .psd,
        .png, .jpg
      </p>

      <p class="mt-4">
        For best results on your logo reproductions, use a black and white logo
        graphic.
      </p>

      <p class="mt-4">
        Please wait for your logo to be fully uploaded before proceeding to the
        next step. A check mark will appear and your logo will be placed on the
        product to indicate your upload is complete.
      </p>
    </div>

    <div class="mb-6 font-bold">
      <div class="configurator-personalizations__toggle">
        <div class="flex items-center mb-4 button-property">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              type="radio"
              id="upload-logo[no]"
              v-model="uploadLogo"
              :value="false"
            />
          </div>
          <label
            for="upload-logo[no]"
            class="text-sm font-bold button-property__name"
            ><span class="button-property__text">No Thanks</span></label
          >
        </div>
        <div class="flex items-center mb-4 button-property">
          <div class="inline-flex items-center pr-1 mr-2 value value--vue">
            <input
              type="radio"
              id="upload-logo[yes]"
              v-model="uploadLogo"
              :value="true"
            />
          </div>
          <label
            for="upload-logo[yes]"
            class="text-sm font-bold button-property__name"
            ><span class="button-property__text"
              >Yes, I would like to upload a logo</span
            ></label
          >
        </div>
      </div>
    </div>

    <div v-if="uploadLogo" class="border-2 border-gray-200 p2">
      <div class="bg-white">
        <DropZone url="https://www.baudville.com/submit_logo_customization" />
      </div>
    </div>
  </DivContainer>
</template>
<script>
import DivContainer from "./div-container.vue";
import { ref } from "vue";

import DropZone from "dropzone-vue";

// optionally import default styles
import "dropzone-vue/dist/dropzone-vue.common.css";
export default {
  components: { DivContainer, DropZone },
  setup() {
    const uploadLogo = ref(true);
    return {
      uploadLogo,
    };
  },
};
</script>
