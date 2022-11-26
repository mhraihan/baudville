<template>
  <div class="mb-5" v-if="products.length">
    <div class="container max-w-screen-xl">
      <h2 class="text-center uppercase heading">You Recently Viewed</h2>
      <div
        class="grid collection-products sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6"
      >
        <div v-for="product in products" :key="product.id">
          <product-view :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { ref, toRefs } from "vue";
import productView from "./product-view.vue";
export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: null,
    },
    compare: {
      type: String,
      default: null,
    },
    sku: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  components: {
    productView,
  },

  setup(props) {
    const { id, title, compare, sku, href, price, image, date } = toRefs(props);

    const products = ref([]);

    const product = {
      id: id.value,
      title: title.value,
      image: image.value,
      href: href.value,
      sku: sku.value,
      price: price.value,
      compare: compare.value,
      badge: dayjs().diff(dayjs(date.value), "days") <= 30,
    };

    products.value =
      JSON.parse(localStorage.getItem("recent-view-products")) || [];
    const data = [...products.value];
    const setProducts = async () => {
      data.unshift(product);

      const recentView = [
        ...new Map(data.map((item) => [item["id"], item])).values(),
      ].slice(0, 4);
      localStorage.setItem("recent-view-products", JSON.stringify(recentView));
    };
    setProducts();

    return {
      products,
    };
  },
};
</script>
