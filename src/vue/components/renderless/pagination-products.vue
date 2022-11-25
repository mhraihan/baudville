<script>
import { ref, toRefs } from "vue";
import $ from "jquery";
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
    handle: {
      type: String,
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
    const { pages, current, limit, handle, url, target } = toRefs(props);
    console.log(limit, handle, url, target);
    const count = ref(1);
    const oldCount = ref(limit.value);
    const counter = ref(parseInt(current.value, 10) + 1);
    const maxCount = ref(pages.value + 1);
    const text = ref("Load More");
    const show = ref(true);

    const loadMore = () => {
      const getURL = url.value + "?page=" + counter.value;
      $.ajax({
        url: getURL,
        type: "GET",
        dataType: "html",
        beforeSend: function () {
          text.value = "Loading More...";
        },
        success: function (data) {
          $(target.value).append($(data).find(".product-summary"));
        },
        error: function (e) {
          console.log(e);
        },
        complete: function () {
          text.value = "Load More";
          // wishlist.reinit();
          // quickAdd.reinit();
          // quickview.reinit();
          oldCount.value = oldCount.value * count.value;
          counter.value++;
          count.value++;
          console.log(oldCount.value);
          window.theme.modalVideo.init(oldCount.value);
          if (counter.value == maxCount.value) {
            show.value = false;
          }
        },
      });
    };
    console.log("Pages: " + url.value);
    console.log("Pages Found: " + pages.value);
    console.log("current Pages:  " + counter.value);

    return () =>
      slots.default({
        loadMore,
        text,
        show,
      });
  },
};
</script>
