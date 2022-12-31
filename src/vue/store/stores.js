/**
 * state
 */
const state = {
  scene7Id: null,
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
  instructions: "",
  signOff: null,
  signOffError: false,
};

/**
 * getters
 */
const getters = {
  getScene7Id(state) {
    return state.scene7Id;
  },
  getItems(state) {
    return state.items;
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
