<template>
  <div class="mb-0 related-products">
    <div class="related-product w-100" v-html="products"></div>
  </div>
</template>
<script>
import { ref, toRefs } from "vue";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { id, section } = toRefs(props);
    const products = ref(null);
    console.log(id.value);
    fetch(
      `/recommendations/products?section_id=${section.value}&product_id=${id.value}&limit=4`
    )
      .then((response) => response.text())
      .then((text) => {
        products.value = text;
      })
      .then(() => {
        window.jQuery(`.product-recommendations .js-video-button`).modalVideo();
      });
    return {
      products,
    };
  },
};
</script>
