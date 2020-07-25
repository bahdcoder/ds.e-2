import React from 'react'
import Select from './Select'
import { render, fireEvent } from '@testing-library/react'

test('toggles open and close select correctly', async () => {
    const { findByRole, findAllByRole } = render(<Select />)

    fireEvent.click(
        await findByRole('button')
    )

    expect(await findAllByRole('menuitemradio')).toHaveLength(3)
})
