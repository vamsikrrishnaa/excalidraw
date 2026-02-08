import { type ExcalidrawFontFaceDescriptor } from "../Fonts";

import Hind300 from "./hind-normal-300.woff2";
import Hind400 from "./hind-normal-400.woff2";
import Hind500 from "./hind-normal-500.woff2";

export const HindFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: Hind300,
    descriptors: {
      unicodeRange: "U+0000-00FF, U+0900-097F",
      weight: "300",
    },
  },
  {
    uri: Hind400,
    descriptors: {
      unicodeRange: "U+0000-00FF, U+0900-097F",
      weight: "400",
    },
  },
  {
    uri: Hind500,
    descriptors: {
      unicodeRange: "U+0000-00FF, U+0900-097F",
      weight: "500",
    },
  },
];