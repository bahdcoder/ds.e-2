import React from "react";
import { FontSize } from "@ds.e-2/foundation";
interface TextProps {
    size?: keyof typeof FontSize;
}
declare const Text: React.FC<TextProps>;
export default Text;
