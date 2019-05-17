import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// This is i18n and i10n
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'

import LazyLoading from '../../common/components/LazyLoading'
import { actions as exampleActions } from '../../redux/modules/example'
import { exampleSelector } from '../../redux/selectors/exampleSelector'
import { ExampleWithError } from '../../common/components/Example';
import { ErrorBoundary } from '../../common/components/Utilities';

// This is lazy loading example
const LazyExample = LazyLoading(() => import('../../common/components/Example/Example'));

class ExampleView extends Component {
  static propTypes = {
    example: PropTypes.object.isRequired,
  }

  state = {
    myArbitraryNumber: Math.floor(Math.random() * 10000),
    currentTime: new Date(),
  }

  componentDidMount() {
    const { getAwesomeCode } = this.props

    getAwesomeCode()
  }

  render() {
    const { myArbitraryNumber, currentTime } = this.state

    // Note for i18n and i10n
    // if `id` is found, it will use the matched message
    // otherwise, it will use defaultMessage as fallback

    return (
      <Fragment>
        <LazyExample {...this.props} />
        <h2>This framework supports i18n and i10n out of the box.</h2>
        <p>
          <FormattedMessage
            id="greetings.hello"
            defaultMessage={'Hello {name}'}
            values={{
              name: <b>Visitor</b>,
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="hooray"
            defaultMessage={`A locallized random number: {myArbitraryNumber, number} {myArbitraryNumber, plural,
              one {item}
              other {items}
            }`}
            values={{
              myArbitraryNumber,
            }}
          />
        </p>
        <p>
          The date is: &nbsp;
          <FormattedDate value={currentTime} />
        </p>
        <p>
          The time is: &nbsp;
          <FormattedTime value={currentTime} />
        </p>
        <ErrorBoundary>
          <ExampleWithError {...this.props} />
        </ErrorBoundary>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  example: exampleSelector(state),
})

const mapDispatchToProps = {
  ...exampleActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleView)
