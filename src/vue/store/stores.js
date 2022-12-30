/**
 * state
 */
const state = {
  scene7Id: null,
  items: [
    {
      line1: null,
      line2: null,
      line3: null,
      line4: null,
      line5: null,
      line6: null,
    },
  ],
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
  getItemById: (state) => (id) => {
    return state.items[id];
  },
  getLastItem(state) {
    if (state.items.length > 0) {
      return state.items.slice(-1).pop();
    }
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
