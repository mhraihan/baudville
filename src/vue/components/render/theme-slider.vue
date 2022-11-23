<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    :loop="true"
    navigation
    :pagination="{ clickable: true, dynamicBullets: true }"
    :modules="modules"
    grab-cursor=""
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <slot />
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import { ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const options = ref([
      {
        img: "https://picsum.photos/1024/600?random=1",
        url: "#",
      },
      {
        img: "https://picsum.photos/1024/600?random=1",
        url: "#",
      },
      {
        img: "https://picsum.photos/1024/600?random=1",
        url: "#",
      },
    ]);
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, A11y],
      options,
    };
  },
};
</script>
