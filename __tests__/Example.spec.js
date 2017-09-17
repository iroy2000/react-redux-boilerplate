import React from 'react'
import { shallow } from 'enzyme'

import { Example } from  '../src/js/common/components/Example'
import { exampleData } from '../__fixtures__'

describe('ExampleView', () => {
  it('should render a blank div without data', () => {
    const el = shallow(<Example />)

    expect(el.length).toEqual(1)
    expect(el.find('.row').length).toEqual(0)
  })

  it('should render with correct data', () => {
    const el = shallow(
      <Example {...exampleData} />
    )

    expect(el.length).toEqual(1)
    expect(el.find('.example__output').length).toEqual(1)
  })
})
