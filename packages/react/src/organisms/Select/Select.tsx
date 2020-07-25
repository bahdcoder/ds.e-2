// import React from 'react'

// interface SelectProps {

// }

// const Select = () => {
//     return null
// }

// export default Select
import React, { useRef, useState, useEffect, KeyboardEventHandler, createRef } from "react";

import Text from "../../atoms/Text";
// import Color from "../../atoms/Color";
// import Margin from "../../atoms/Margin";

interface SelectProps {
  width?: string;
}

const getNextItemIndex = (currentIndex: number|null, items: Array<any>): number => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === items.length - 1) {
        return 0
    }

    return currentIndex + 1
}

const getPreviousItemIndex = (currentIndex: number|null, items: Array<any>): number => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === 0) {
        return items.length - 1
    }

    return currentIndex - 1
}

const Select: React.FC<SelectProps> = ({ width = "100%" }) => {
    const items = [
        { hexCode: "#000", label: "Strict Black" },
        {
            hexCode: "green",
            label: "Heavenly green",
        },
        {
            hexCode: "pink",
            label: "Sweet Pink",
        },
    ]
  const labelRef = useRef<HTMLButtonElement>(null);
  const [itemRefs, setItemRefs] = useState<Array<React.RefObject<HTMLLIElement>>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onOptionSelect = (itemIndex: number) => {
      const item = items[itemIndex]

      if (! item) {
          return
      }

      setSelectedIndex(itemIndex)
      setIsOpen(false)
  }

  const toggleHighlightedItem = (index: number | null) => {
    highlightItem(index);
  };

  const onLabelKeyDown: KeyboardEventHandler = (event) => {
      event.preventDefault()

      // DOWN arrow
      if ([32, 13, 40].includes(event.keyCode)) {
          setIsOpen(true)

          highlightItem(getNextItemIndex(highlightedIndex, items))
      }

  }

  const highlightItem = (index: number|null) => {
    setHighlightedIndex(index)

    if (index !== null) {
        const ref = itemRefs[index]

        if (ref && ref.current) {
            ref.current.focus()
        }
    }
  }

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    // ESC key
    if (event.keyCode === 27) {
        setIsOpen(false)

        return
    }

    // DOWN arrow
    if (event.keyCode === 40) {
        highlightItem(getNextItemIndex(highlightedIndex, items))

        return
    }

    // UP arrow
    if (event.keyCode === 38) {
        highlightItem(getPreviousItemIndex(highlightedIndex, items))

        return
    }

    // ENTER key
    if (event.keyCode === 13) {
        onOptionSelect(highlightedIndex!)
    }
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    setItemRefs(items.map(_ => createRef<HTMLLIElement>()))
  }, [items.length])

  useEffect(() => {
      if (highlightedIndex !== null && isOpen) {
        const ref = itemRefs[highlightedIndex!]

        if (ref && ref.current) {
            ref.current.focus()
        }
      }
  }, [isOpen])

  const selected = items[selectedIndex!]

  return (
    <div style={{ width }} className="dse-select">
      <button
        role="button"
        data-testid='DseSelectLabel'
        onKeyDown={onLabelKeyDown}
        aria-haspopup={true}
        aria-controls="dse-select-list"
        // aria-label="Size"
        tabIndex={isOpen ? -1 : 0}
        aria-expanded={isOpen ? true : undefined}
        onClick={toggleOpen}
        ref={labelRef}
        className="dse-select__label"
      >
        <Text>
            {selected ? selected.label : 'Color'}
        </Text>

        <svg
          className={`dse-select__caret dse-select__caret--${
            isOpen ? "up" : "down"
          }`}
          fill="none"
          width="1rem"
          height="1rem"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen ? (
        <ul
          role="menu"
          id="dse-select-list"
          className="dse-select__overlay"
          aria-hidden={isOpen ? undefined : false}
          style={{ width: `calc(${width} - 2px)`, top: overlayTop }}
          aria-activedescendant={`dse-select__item-${highlightedIndex}`}
        >
          {items.map((item, index) => {
            const highlighted = index === highlightedIndex;
            const selected = index === selectedIndex
            const ref = itemRefs[index]

            return (
              <li
                ref={ref}
                onMouseEnter={() => toggleHighlightedItem(index)}
                onMouseLeave={() => toggleHighlightedItem(null)}
                tabIndex={highlighted ? -1 : 0}
                role="menuitemradio"
                aria-checked={selected ? true : undefined}
                onClick={() => onOptionSelect(index)}
                onKeyDown={onOptionKeyDown}
                id={`dse-select__item-${index}`}
                aria-label={item.label}
                key={index}
                className={`dse-select__item ${
                  highlighted ? "dse-select__item--highlighted" : ""
                }  ${
                    selected ? "dse-select__item--selected" : ""
                }`}
              >
                <div className="dse-select__item__label">
                  {/* <Color hexCode={item.hexCode} /> */}
                  {/* <Margin space="sm" left>
                  </Margin> */}
                    <Text>{item.label}</Text>
                </div>

                {selected ? (
                    <svg width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
