<template>
  <div class="mb-5 available-options">
    <p class="mb-3 font-bold sentiments__heading">
      Available Options
    </p>
    <div class="flex flex-wrap">
      <div
        v-for="(product, key) in products"
        :key="key"
        class="pr-2 sentiments__item last:pr-0"
      >
        <a
          v-if="product.featured_image"
          class="sentiments__button"
          :href="product.url"
        ><img
          :alt="product.title"
          class="object-cover object-center w-16 h-16 sentiments__image"
          :src="product.featured_image"
        >
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, onMounted } from "vue";
import { shuffle } from "lodash";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const { id } = toRefs(props);
    const products = ref(null);

    onMounted(() => {
      fetch(
        `${window.Shopify.routes.root}recommendations/products.json?product_id=${id.value}&limit=4&intent=related`
      )
        .then((response) => response.json())
        .then((data) => {
          products.value = shuffle(data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return {
      products,
    };
  },
};
</script>
