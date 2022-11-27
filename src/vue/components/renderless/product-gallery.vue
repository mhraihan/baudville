<script>
import { ref, toRefs } from "vue";
export default {
  props: {
    image: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const { image } = toRefs(props);
    const initialRender = ref(true);
    const currentImage = ref(null);
    const zoomImage = ref(null);

    zoomImage.value = {
      url: image.value,
    };

    const switchImage = ($el) => {
      initialRender.value = false;
      currentImage.value = {
        url: $el.target.dataset.url,
        alt: $el.target.dataset.alt || "",
      };
      zoomImage.value.url = $el.target.dataset.zoom;
    };

    const move = ($el) => {
      const zoomer = $el.currentTarget;
      const offsetX = $el.offsetX;
      const offsetY = $el.offsetY;
      const x = (offsetX / zoomer.offsetWidth) * 100;
      const y = (offsetY / zoomer.offsetHeight) * 100;

      zoomer.style.backgroundPosition = x + "% " + y + "%";
    };

    return () =>
      slots.default({
        initialRender: initialRender.value,
        currentImage: currentImage.value,
        zoomImage: zoomImage.value,
        switchImage,
        move,
      });
  },
};
</script>
