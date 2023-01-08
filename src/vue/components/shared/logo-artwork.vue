<template>
  <DivContainer>
    <StepCanvas v-if="canvases.length" />
    <div v-else>
      <h3 class="flex items-end mb-2 text-2xl uppercase">
        Add your logo or artwork
        <span class="mb-1 ml-2 text-sm normal-case primary-color"
          >(Optional)</span
        >
      </h3>
      <p class="mb-6 font-semibold">
        Customize with your organization's logo or graphic. Minimum $35 setup
        fee; free with orders over $100!
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
          For best results on your logo reproductions, use a black and white
          logo graphic.
        </p>

        <p class="mt-4">
          Please wait for your logo to be fully uploaded before proceeding to
          the next step. A check mark will appear and your logo will be placed
          on the product to indicate your upload is complete.
        </p>
      </div>

      <div class="mb-6 font-bold">
        <div class="configurator-personalizations__toggle">
          <div class="flex items-center mb-4 button-property">
            <div class="inline-flex items-center pr-1 mr-2 value value--vue">
              <input
                id="upload-logo[no]"
                v-model="uploadLogo"
                type="radio"
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
                id="upload-logo[yes]"
                v-model="uploadLogo"
                type="radio"
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

      <div v-if="uploadLogo" class="border-2 border-gray-200 p-2 mb-10">
        <div class="bg-white">
          <DropZone
            @sending="sending"
            url="https://www.baudville.com/submit_logo_customization"
          />
        </div>
      </div>
    </div>
  </DivContainer>
</template>
<script>
import DivContainer from "./div-container.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

import DropZone from "dropzone-vue";

// optionally import default styles
import "dropzone-vue/dist/dropzone-vue.common.css";
import StepCanvas from "./step-canvas.vue";
export default {
  components: { DivContainer, DropZone, StepCanvas },
  setup() {
    const store = useStore();
    const uploadLogo = ref(false);
    const canvases = computed(() => store.getters.getCanvases);
    const sending = (files, xhr, formData) => {
      function callback(e) {
        console.log(JSON.parse(e));
        store.dispatch("saveArtwork", JSON.parse(e));
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response);
        }
      };
    };
    return {
      uploadLogo,
      sending,
      canvases,
    };
  },
};
</script>
