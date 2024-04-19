import { action } from "easy-peasy";

const recentModel = {
  items: [],
  addToFovorite: action((state, payload) => {
    state.items.push(payload);
    state.items = state.items.slice(0, 5);
  }),
};

export default recentModel;
