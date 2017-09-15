/*eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Example } from '../src/js/common/components/Example';
import { exampleData } from '../__fixtures__';


storiesOf('Example View', module)
  .add('no data', () => <Example />)
  .add('with example data', () => <Example {...exampleData} />);


/*eslint-enable */
