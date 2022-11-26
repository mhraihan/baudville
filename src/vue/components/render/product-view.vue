<template>
  <div
    class="w-full product-summary group"
    itemscope=""
    itemtype="http://schema.org/Product"
  >
    <div
      class="relative flex items-center border-2 rounded-sm product-summary__media broder-gray-300"
    >
      <div class="product-summary__media-link-wrapper">
        <a class="product-summary__media-link" :href="product.href">
          <img
            v-if="product.image"
            itemprop="image"
            class="product-summary__media-image"
            :src="product.image"
            :alt="product.title"
            loading="lazy"
          />
        </a>
      </div>
      <div
        class="absolute bottom-0 left-0 w-full transition-opacity opacity-0 quickview-button group-hover:opacity-100"
      >
        <button
          @click="quickview"
          class="button button--full button--quickview"
          rel="nofollow"
          data-modifier="false"
          href="#"
        >
          Quick View
        </button>
      </div>
    </div>
    <div class="my-3 text-center product-summary__info">
      <span
        v-if="product.badge"
        class="text-xl font-bold tracking-wide text-green-100 uppercase font-bn"
        >New</span
      >
      <p class="mb-2 product-summary__name" itemprop="name">
        <a
          class="text-base font-semibold tracking-wider text-gray-100 hover:text-green-100"
          itemprop="url"
          :href="product.href"
        >
          {{ product.title }}
        </a>
      </p>
      <div class="flex items-center justify-center">
        <div
          v-if="product.sku"
          class="p-2 pr-4 mr-4 text-xs border-r-2 border-gray-200 product-summary__id"
          itemprop="productID"
        >
          # {{ product.sku }}
        </div>
        <div
          class="flex text-xl font-bold product-prices font-bn product-prices--summary"
          itemprop="offers"
          itemscope=""
          itemtype="http://schema.org/Offer"
        >
          <p
            v-if="product.compare"
            class="mr-2 text-gray-400 product-prices__price product-prices__price--original"
          >
            <s>{{ product.compare }}</s>
          </p>
          <p
            class="font-semibold text-red-50 product-prices__price product-prices__price--discounted"
          >
            <span
              ><meta content="USD" itemprop="priceCurrency" /><meta
                content="1.5"
                itemprop="price" />
              {{ product.price }}
              <link href="https://schema.org/InStock" itemprop="availability"
            /></span>
          </p>
        </div>
      </div>
      <p class="product-summary__video-link">
        <button
          class="flex items-center text-green-100 border-none button hover:text-black"
          @click="video"
        >
          <span class="product-summary__video-link-icon"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              class="mr-1 fill-green-100 svg-icon svg-icon--small svg-icon--link-color"
            >
              <title>Play Video</title>
              <path
                d="M12.21,9.21a1.63,1.63,0,0,0-1.57,1.63V21.15A1.61,1.61,0,0,0,13,22.57L22,17.41a1.62,1.62,0,0,0,0-2.82L13,9.43A1.72,1.72,0,0,0,12.21,9.21ZM16,2.43A13.57,13.57,0,1,1,2.43,16,13.56,13.56,0,0,1,16,2.43ZM16,1A15,15,0,1,0,31,16,15,15,0,0,0,16,1Z"
              ></path></svg></span
          ><span
            class="text-xs product-summary__video-link-text js-video-button"
            data-video-id="731044217"
            data-channel="vimeo"
            >Watch this video</span
          >
        </button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const video = () => {
      console.log("open video");
    };
    const quickview = () => {
      console.log("open quickview");
    };
    return {
      video,
      quickview,
    };
  },
};
</script>
