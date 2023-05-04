import { create } from "twrnc";

const tw = create(require(`../tailwind.config`)); // <- your path may differ

// ... and then this becomes the main function your app uses
export default tw;
