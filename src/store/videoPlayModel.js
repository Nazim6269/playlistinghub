import { action, persist } from "easy-peasy";

const videoPlayModel = persist({
  data: [],
  addVideo: action((state, payload) => {
    state.data.push(payload);
  }),
});

export default videoPlayModel;
