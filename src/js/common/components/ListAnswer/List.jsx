import React from 'react'
import PropTypes from 'prop-types'

import styles from './List.css'

class List extends React.PureComponent {

  render() {
    return (
      <div className="list">
        <p>{ `${this.props.title} ${this.props.counter}` }</p>
        <ul>
          { this.renderList() }
        </ul>
      </div>
    )
  }

  renderList() {
    return this.props.data.map( d => {
      return <li key={ d.id }>{ d.name } <button onClick={ this.props.onClick }>Update</button></li>
    });
  }

}

// Default props create defaults in the event a property is missing.
// This is good to add to avoid doing existence checks on values as well
// as making it easier for others to immediately use your components
// to get a sense for what they look like.
List.defaultProps = {
  title  : 'My Title',
  onClick: () => {},
  counter: 1,
}

// Prop types do evaluations on passed in properties to ensure they are 
// what the component is expecting.  While this appears to be a good way
// to add type safety to your component in reality it's much more useful as
// documentation so others have a list of the available properties the component
// will be using.
List.PropTypes = {
  title  : PropTypes.string,
  data   : PropTypes.array.isRequired,
  onClick: PropTypes.func,
  counter: PropTypes.number,
}

export default List