import React from 'react'
import ReactDOM from 'react-dom'

import { Select } from '@ds.e-2/react'

import '@ds.e-2/scss/lib/Utilities.css'
import '@ds.e-2/scss/lib/Text.css'
import '@ds.e-2/scss/lib/Margin.css'
import '@ds.e-2/scss/lib/global.css'
import '@ds.e-2/scss/lib/Select.css'
import '@ds.e-2/scss/lib/Color.css'

ReactDOM.render(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Select width='300px' />
    </div>,
    document.querySelector('#root')
)
