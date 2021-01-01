import { createStore } from "../react-store";
import reducer, { initState } from "./reducer/Reducer";

const load = createStore(reducer, initState);

export default load;
