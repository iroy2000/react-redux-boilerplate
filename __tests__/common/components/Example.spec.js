import React from 'react'
import { fromJS } from 'immutable'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { Example } from  '../../../src/js/common/components/Example'

const fixture = {
  example: {
    result: fromJS({
      testing: 'data',
    }),
  },
};

describe('ExampleView', () => {
  it('should render a blank div without data', () => {
    const el = shallow(<Example />)

    expect(el.length).toEqual(1)
    expect(el.find('.exampleOutput').length).toEqual(0)
  })

  it('should render with correct data', () => {
    const el = shallow(
      <Example {...fixture} />
    )

    expect(el.length).toEqual(1)
    expect(el.find('.exampleOutput').length).toEqual(1)
  })
})
