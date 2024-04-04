import { useEffect } from "react";
import getPlayList from "./api";

const App = () => {
  useEffect(() => {
    getPlayList("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl").then((res) =>
      console.log(res)
    );
  }, []);
  return <h1>Youtube Project</h1>;
};

export default App;
