import React from 'react'
import ReactDOM from 'react-dom'

import Color from '@ds.e-2/react/lib/atoms/Color'
import { Spacing } from '@ds.e-2/foundation'

import '@ds.e-2/scss/lib/Utilities.css'
import '@ds.e-2/scss/lib/global.css'
import '@ds.e-2/scss/lib/Color.css'

ReactDOM.render(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Color hexCode='pink' width={Spacing.xl} height={Spacing.xl} />
    </div>,
    document.querySelector('#root')
)
