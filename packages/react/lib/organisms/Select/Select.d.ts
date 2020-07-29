import React from "react";
interface SelectOpion {
    label: string;
    value: string;
}
interface RenderOptionArguments {
    selectIsOpen: boolean;
    isSelected: boolean;
    option: SelectOpion;
    isHighlighted: boolean;
    ref: React.RefObject<HTMLLIElement>;
    getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
export interface SelectProps {
    width?: string;
    options?: Array<SelectOpion>;
    onOptionSelected?: (option: SelectOpion) => void;
    renderOption?: (options: RenderOptionArguments) => React.ReactNode;
}
declare const Select: React.FC<SelectProps>;
export default Select;
