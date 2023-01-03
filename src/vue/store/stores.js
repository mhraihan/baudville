/**
 * state
 */
const state = {
  scene7Id: null,
  emblem: null,
  items: [
    {
      line1: "",
      line2: "",
      line3: "",
      line4: "",
      line5: "",
      line6: "",
    },
  ],
  activeIndex: 0,
  instructions: "",
  signOff: null,
  signOffError: false,
  artwork: {},
  layout: null,
  font: "",
  fontSize: [112, 80, 80],
  verse: null,
  templateColor: null,
};

/**
 * getters
 */
const getters = {
  getScene7Id(state) {
    return state.scene7Id;
  },
  getEmblem(state) {
    return state.emblem;
  },
  getTemplateColor(state) {
    return state.templateColor;
  },
  getArtwork(state) {
    return state.artwork;
  },
  getFont(state) {
    return state.font;
  },
  getFontSize(state) {
    return state.fontSize;
  },
  getVerse(state) {
    return state.verse;
  },
  getActiveIndex(state) {
    return state.activeIndex;
  },
  getItems(state) {
    return state.items;
  },
  getLayout(state) {
    return state.layout;
  },
  getItemSize(state) {
    return state.items.length - 1;
  },
  getItemById: (state) => (id) => {
    return state.items[id];
  },
  getLastItem(state) {
    if (state.items.length > 0) {
      return state.items.slice(-1).pop();
    }
  },
  instructions(state) {
    return state.instructions;
  },
  signOff(state) {
    return state.signOff;
  },
  signOffError(state) {
    return state.signOffError;
  },
};

/**
 * mutations
 */
const mutations = {
  SAVE_SCENE7_ID(state, id) {
    state.scene7Id = id;
  },
  SAVE_EMBLEM(state, id) {
    state.emblem = id;
  },
  SAVE_ARTWORK(state, artwork) {
    state.artwork = artwork;
  },
  SAVE_TEMPLATE_COLOR(state, templateColor) {
    state.templateColor = templateColor;
  },
  SAVE_LAYOUT(state, layout) {
    state.layout = layout;
  },
  SAVE_FONT(state, font) {
    state.font = font;
  },
  SAVE_FONT_SIZE(state, fontSize) {
    state.fontSize = fontSize;
  },
  SAVE_VERSE(state, verse) {
    state.verse = verse;
  },
  UPDATE_ACTIVE_INDEX(state, index) {
    state.activeIndex = index;
  },
  SAVE_ITEMS(state, item) {
    state.items.push(item);
  },
  UPDATE_ITEMS(state, { item, index }) {
    state.items[index] = item;
  },
  DELETE_ITEMS(state, index) {
    state.items.splice(index, 1);
  },
  SAVE_INSTRUCTIONS(state, text) {
    state.instructions = text;
  },
  SAVE_SIGN_OFF(state, text) {
    state.signOff = text;
  },
  SAVE_SIGN_OFF_ERROR(state, bool) {
    state.signOffError = bool;
  },
};

/**
 * actions
 */
const actions = {
  saveScene7Id({ commit }, id) {
    commit("SAVE_SCENE7_ID", id);
  },
  saveEmblem({ commit }, id) {
    commit("SAVE_EMBLEM", id);
  },
  saveArtwork({ commit }, artwork) {
    commit("SAVE_ARTWORK", artwork);
  },
  saveTemplateColor({ commit }, templateColor) {
    commit("SAVE_TEMPLATE_COLOR", templateColor);
  },
  saveFont({ commit }, font) {
    commit("SAVE_FONT", font);
  },
  saveFontSize({ commit }, fontSize) {
    commit("SAVE_FONT_SIZE", fontSize);
  },
  saveLayout({ commit }, layout) {
    commit("SAVE_LAYOUT", layout);
  },
  saveVerse({ commit }, verse) {
    commit("SAVE_VERSE", verse);
  },
  updateActiveIndex({ commit }, index) {
    commit("UPDATE_ACTIVE_INDEX", index);
  },
  saveItems({ commit }, item) {
    commit("SAVE_ITEMS", item);
  },
  updateItem({ commit }, obj) {
    commit("UPDATE_ITEMS", obj);
  },
  deleteItem({ commit }, index) {
    commit("DELETE_ITEMS", index);
  },
  saveInstructions({ commit }, text) {
    commit("SAVE_INSTRUCTIONS", text);
  },
  saveSignOff({ commit }, text) {
    commit("SAVE_SIGN_OFF", text);
  },
  saveSignOffEror({ commit }, bool) {
    commit("SAVE_SIGN_OFF_ERROR", bool);
  },
};

/**
 * export
 */
export default {
  //   namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
