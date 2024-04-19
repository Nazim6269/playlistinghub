import { action } from "easy-peasy";

const favoriteModel = {
  items: [],
  addToFovorite: action((state, payload) => {
    state.items.push(payload);
  }),
  removeFromFavorite: action((state, payload) => {
    state.items = state.items.filter((pId) => pId !== payload);
  }),
};

export default favoriteModel;
