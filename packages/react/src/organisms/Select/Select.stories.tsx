import React from 'react'
import Select from './Select'
import Text from '../../atoms/Text'
import Color from '../../atoms/Color'
import Margin from '../../atoms/Margin'
import { withA11Y } from '@storybook/addon-a11y'

import '@ds.e-2/scss/lib/Select.css'
import '@ds.e-2/scss/lib/Text.css'
import '@ds.e-2/scss/lib/Color.css'
import '@ds.e-2/scss/lib/Margin.css'

export default { title: 'Molecules|Select', component: Select, decorators: [withA11Y] }

const options = [{
    label: 'Strict Black',
    value: 'black'
}, {
    label: 'Heavenly Green',
    value: 'green'
}, {
    label: 'Sweet Pink',
    value: 'pink'
}]

export const Common = () => <Select options={options} />;

export const RenderOption = () => <Select options={options} renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
    <li {...getOptionRecommendedProps()}>
        <div className='dse-select__item__label'>
            <Color hexCode={option.value} />
            <Margin left>
                <Text>
                    {option.label}
                </Text>
            </Margin>
        </div>

        {isSelected ? (
            <svg width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>
        ) : null}
    </li>
)}  />
