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

interface SelectOpion {
  label: string
  value: string
}

interface RenderOptionArguments {
  selectIsOpen: boolean
  isSelected: boolean
  option: SelectOpion
  isHighlighted: boolean
  ref: React.RefObject<HTMLLIElement>
  getOptionRecommendedProps: (overrideProps?: Object) => Object
}

export interface SelectProps {
  width?: string;
  options?: Array<SelectOpion>;
  onOptionSelected?: (option: SelectOpion) => void
  renderOption?: (options: RenderOptionArguments) => React.ReactNode
}

const getNextItemIndex = (currentIndex: number|null, options: Array<any>): number => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === options.length - 1) {
        return 0
    }

    return currentIndex + 1
}

const getPreviousItemIndex = (currentIndex: number|null, options: Array<any>): number => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === 0) {
        return options.length - 1
    }

    return currentIndex - 1
}

const Select: React.FC<SelectProps> = ({ width = "100%", options = [], onOptionSelected, renderOption }) => {
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
      const item = options[itemIndex]

      if (! item) {
          return
      }

      setSelectedIndex(itemIndex)
      setIsOpen(false)

      if (onOptionSelected) {
        onOptionSelected(item)
      }
  }

  const toggleHighlightedItem = (index: number | null) => {
    highlightItem(index);
  };

  const onLabelKeyDown: KeyboardEventHandler = (event) => {
      event.preventDefault()

      // DOWN arrow
      if ([32, 13, 40].includes(event.keyCode)) {
          setIsOpen(!isOpen)

          highlightItem(getNextItemIndex(highlightedIndex, options))
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
        highlightItem(getNextItemIndex(highlightedIndex, options))

        return
    }

    // UP arrow
    if (event.keyCode === 38) {
        highlightItem(getPreviousItemIndex(highlightedIndex, options))

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
    setItemRefs(options.map(_ => createRef<HTMLLIElement>()))
  }, [options.length])

  useEffect(() => {
      if (highlightedIndex !== null && isOpen) {
        const ref = itemRefs[highlightedIndex!]

        if (ref && ref.current) {
            ref.current.focus()
        }
      }
  }, [isOpen])

  const selected = options[selectedIndex!]

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
          {options.map((item, index) => {
            const highlighted = index === highlightedIndex;
            const selected = index === selectedIndex
            const ref = itemRefs[index]

            const getOptionRecommendedProps = (overrideProps = {}) => ({
              tabIndex: highlighted ? -1 : 0,
              ref,
              onMouseLeave: () => toggleHighlightedItem(null),
              onMouseEnter: () => toggleHighlightedItem(index),
              role: 'menuitemradio',
              'aria-checked': selected ? true : undefined,
              onKeyDown: onOptionKeyDown,
              onClick: () => onOptionSelect(index),
              id: `dse-select__item-${index}`,
              className: `dse-select__item ${
                highlighted ? "dse-select__item--highlighted" : ""
              }  ${
                  selected ? "dse-select__item--selected" : ""
              }`,
              'aria-label': item.label,
              key: index,
              ...overrideProps
            })

            if (renderOption) {
              return renderOption({
                ref,
                isHighlighted: highlighted,
                isSelected: selected,
                option: item,
                selectIsOpen: isOpen,
                getOptionRecommendedProps
              })
            }

            return (
              <li
                {...getOptionRecommendedProps()}
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
