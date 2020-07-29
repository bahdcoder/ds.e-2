import React$1, { useRef, useState, useEffect, createRef } from 'react';
import Text$1 from '../../atoms/Text/Text.js';

// import React from 'react'
const getNextItemIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === options.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const getPreviousItemIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return options.length - 1;
    }
    return currentIndex - 1;
};
const Select = ({ width = "100%", options = [], onOptionSelected, renderOption }) => {
    var _a;
    const labelRef = useRef(null);
    const [itemRefs, setItemRefs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    const onOptionSelect = (itemIndex) => {
        const item = options[itemIndex];
        if (!item) {
            return;
        }
        setSelectedIndex(itemIndex);
        setIsOpen(false);
        if (onOptionSelected) {
            onOptionSelected(item);
        }
    };
    const toggleHighlightedItem = (index) => {
        highlightItem(index);
    };
    const onLabelKeyDown = (event) => {
        event.preventDefault();
        // DOWN arrow
        if ([32, 13, 40].includes(event.keyCode)) {
            setIsOpen(!isOpen);
            highlightItem(getNextItemIndex(highlightedIndex, options));
        }
    };
    const highlightItem = (index) => {
        setHighlightedIndex(index);
        if (index !== null) {
            const ref = itemRefs[index];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    };
    const onOptionKeyDown = (event) => {
        // ESC key
        if (event.keyCode === 27) {
            setIsOpen(false);
            return;
        }
        // DOWN arrow
        if (event.keyCode === 40) {
            highlightItem(getNextItemIndex(highlightedIndex, options));
            return;
        }
        // UP arrow
        if (event.keyCode === 38) {
            highlightItem(getPreviousItemIndex(highlightedIndex, options));
            return;
        }
        // ENTER key
        if (event.keyCode === 13) {
            onOptionSelect(highlightedIndex);
        }
    };
    useEffect(() => {
        var _a;
        setOverlayTop((((_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0) + 10);
    }, [(_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight]);
    useEffect(() => {
        setItemRefs(options.map(_ => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = itemRefs[highlightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen]);
    const selected = options[selectedIndex];
    return (React$1.createElement("div", { style: { width }, className: "dse-select" },
        React$1.createElement("button", { role: "button", "data-testid": 'DseSelectLabel', onKeyDown: onLabelKeyDown, "aria-haspopup": true, "aria-controls": "dse-select-list", 
            // aria-label="Size"
            tabIndex: isOpen ? -1 : 0, "aria-expanded": isOpen ? true : undefined, onClick: toggleOpen, ref: labelRef, className: "dse-select__label" },
            React$1.createElement(Text$1, null, selected ? selected.label : 'Color'),
            React$1.createElement("svg", { className: `dse-select__caret dse-select__caret--${isOpen ? "up" : "down"}`, fill: "none", width: "1rem", height: "1rem", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, viewBox: "0 0 24 24", stroke: "currentColor" },
                React$1.createElement("path", { d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React$1.createElement("ul", { role: "menu", id: "dse-select-list", className: "dse-select__overlay", "aria-hidden": isOpen ? undefined : false, style: { width: `calc(${width} - 2px)`, top: overlayTop }, "aria-activedescendant": `dse-select__item-${highlightedIndex}` }, options.map((item, index) => {
            const highlighted = index === highlightedIndex;
            const selected = index === selectedIndex;
            const ref = itemRefs[index];
            const getOptionRecommendedProps = (overrideProps = {}) => (Object.assign({ tabIndex: highlighted ? -1 : 0, ref, onMouseLeave: () => toggleHighlightedItem(null), onMouseEnter: () => toggleHighlightedItem(index), role: 'menuitemradio', 'aria-checked': selected ? true : undefined, onKeyDown: onOptionKeyDown, onClick: () => onOptionSelect(index), id: `dse-select__item-${index}`, className: `dse-select__item ${highlighted ? "dse-select__item--highlighted" : ""}  ${selected ? "dse-select__item--selected" : ""}`, 'aria-label': item.label, key: index }, overrideProps));
            if (renderOption) {
                return renderOption({
                    ref,
                    isHighlighted: highlighted,
                    isSelected: selected,
                    option: item,
                    selectIsOpen: isOpen,
                    getOptionRecommendedProps
                });
            }
            return (React$1.createElement("li", Object.assign({}, getOptionRecommendedProps()),
                React$1.createElement("div", { className: "dse-select__item__label" },
                    React$1.createElement(Text$1, null, item.label)),
                selected ? (React$1.createElement("svg", { width: '1rem', height: '1rem', fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, viewBox: "0 0 24 24", stroke: "currentColor" },
                    React$1.createElement("path", { d: "M5 13l4 4L19 7" }))) : null));
        }))) : null));
};

export default Select;
//# sourceMappingURL=Select.js.map
