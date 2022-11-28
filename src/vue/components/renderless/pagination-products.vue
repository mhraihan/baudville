<script>
import { ref, toRefs } from "vue";

export default {
  props: {
    pages: {
      type: [String, Number],
      required: true,
    },
    current: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { pages, current, limit, url, target } = toRefs(props);

    const count = ref(1);
    const oldCount = ref(limit.value);
    const counter = ref(parseInt(current.value, 10) + 1);
    const maxCount = ref(pages.value + 1);
    const text = ref("Load More");
    const show = ref(true);

    const loadMore = () => {
      const getURL = url.value + "?page=" + counter.value;
      window.jQuery.ajax({
        url: getURL,
        type: "GET",
        dataType: "html",
        beforeSend: function () {
          text.value = "Loading More...";
        },
        success: function (data) {
          window
            .jQuery(target.value)
            .append(window.jQuery(data).find(".product-summary"));
        },
        error: function (e) {
          console.log(e);
        },
        complete: function () {
          text.value = "Load More";
          // wishlist.reinit();
          // quickAdd.reinit();
          window.theme.quickview.reinit();
          oldCount.value = oldCount.value * count.value;
          counter.value++;
          count.value++;

          window.theme.modalVideo.init(oldCount.value);
          if (counter.value == maxCount.value) {
            show.value = false;
          }
        },
      });
    };

    return () =>
      slots.default({
        loadMore,
        text,
        show,
      });
  },
};
</script>
