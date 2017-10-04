import React from 'react'
import { List } from '../../common/components/List'

// the goal of this exercise is to create a simple component that renders a list of data set in
// this component's state with a title

class Page extends React.PureComponent {

  componentWillMount() {
    this.state = {
      title: 'Users',
      data: [
        { id: 1, name: 'Mike' },
        { id: 2, name: 'Sarah' },
        { id: 3, name: 'Alex' },
        { id: 4, name: 'Jenny' },
      ]
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to the component workshop</h2>
      </div>
    );
  }

  onClick() {
    alert('success');
  }

}

export default Page