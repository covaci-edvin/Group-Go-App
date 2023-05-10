import { PixelRatio } from "react-native";

// const paddingTop =
//   Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(140) : 150;
// const paddingRight =
//   Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(0) : 0;
// const paddingBottom =
//   Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(100) : 230;

const paddingTop =
  Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(0) : 0;
const paddingRight =
  Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(0) : 0;
const paddingBottom =
  Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(0) : 0;

export const mapPadding = {
  top: paddingTop,
  right: paddingRight,
  bottom: paddingBottom,
  left: 0,
};
