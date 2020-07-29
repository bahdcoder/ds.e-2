import React from 'react'
import { text, select, withKnobs } from '@storybook/addon-knobs'

import '@ds.e-2/scss/lib/Color.css'
import '@ds.e-2/scss/lib/Utilities.css'

import Color, { ColorProps } from './Color'
import { Spacing } from '@ds.e-2/foundation'

export default {
    title: 'Atoms|Color',
    component: Color,
    decorators: [withKnobs]
}

export const Common = () =>
    <Color
        hexCode={text('Color background (hexCode Prop)', 'pink')}
        width={select<ColorProps['width']>('Width', Object.values(Spacing), 'xl')}
        height={select<ColorProps['width']>('Height', Object.values(Spacing), 'xl')}
    />
