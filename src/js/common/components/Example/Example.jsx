import React, { PureComponent } from 'react';

import styles from './Example.css';

/**
 * Example
 * =============
 * Besides it is acting as an example show case
 * Please also spend some time on the comments, it might
 * help you to grab more solid understanding of using React.
 *
 * Using React is easy, but using React correctly could be hard
 *
 * @extends PureComponent
 */

class Example extends PureComponent {
  /* eslint-disable max-len */
  //
  // getDerivedStateFromProps is a replacement of componentWillReceiveProps
  // getDerivedStateFromProps exists for only one purpose.
  // It enables a component to update its internal state as the result of changes in props.
  // This method will run whenever parent is re-rendered
  //
  // static getDerivedStateFromProps(nextProps, prevState) {
  // }

  // getSnapshotBeforeUpdate is a replacement of componentWillUpdate
  // This is called right before the changes from VDOM is to be reflected in the DOM
  // If you return a value here, it will be the 3rd paramter of componentDidUpdate
  //
  // The new getSnapshotBeforeUpdate lifecycle is called right before mutations are made (e.g. before the DOM is updated).
  // The return value for this lifecycle will be passed as the third parameter to componentDidUpdate.
  // Note: This lifecycle isn’t often needed, but can be useful in cases like manually preserving scroll position during rerenders.
  //
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //
  // }
  //
  /* eslint-enable max-len */

  render() {
    const { example } = this.props;
    const result = (example && example.result) || null;

    if (result) {
      return (
        <div className={styles.exampleOutput}>
          <h1>
            Let&apos;s Get
            <span className={styles.emphasize}>Started</span>
          </h1>
          <p>If you see this screen, it means you are all setup \o/</p>
          <p>
            The following JSON are showing contents coming from Redux, Saga and
            Config.
          </p>
          <pre>{JSON.stringify(result, undefined, 2)}</pre>
        </div>
      );
    }
    return <div />;
  }
}

export default Example;
