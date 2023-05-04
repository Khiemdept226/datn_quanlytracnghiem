export const state = () => ({
  count: 0,
});

export const getters = {
  getCounter(state) {
    return state.count;
  },
};

export const mutations = {
  test(state) {
    state.count++;
  },
};

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.count = res.data;
    return res.data;
  },
};
