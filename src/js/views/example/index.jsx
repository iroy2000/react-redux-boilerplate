import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';

require('../../../style/index.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...exampleActions,
};

@connect(mapStateToProps, mapDispatchToProps)



class StringInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // Only update if the input string is alphanumeric
    if (document.getElementById("input_string").checkValidity()) {
      this.props.onUserInput(this.refs.inputString.value);
    }
  }

  render() {
    return (
      <div className="string_input">
        <form>
        <input
          id="input_string"
          ref="inputString"
          type="text"
          pattern="[a-zA-Z0-9]*"
          title="Enter an alphanumeric string, please!"
          placeholder="Type or Paste a String ..."
        />
        <input
          id="check_button"
          type="submit"
          value="Check"
          onClick={this.handleChange}/>
        </form>
      </div>
    );
  }
}

class ResultBox extends Component {
  render() {
    return (
      <div className="result_box">
        <div className="result_substring">
          { this.props.substring }
        </div>
        <div className="result_count">
          { this.props.count }
        </div>
      </div>
    );
  }
}

class ResultsContainer extends Component {
  generate_results(inputString) {
    var counts = {};

    // loop variables
    var startPos;
    var endPos;
    var substring;
    // loop through all the substrings, and count them up!
    for (startPos = 0; inputString.length > startPos; startPos++) {
      for (endPos = startPos + 1; inputString.length >= endPos; endPos++) {
        substring = inputString.substring(startPos, endPos);
        counts[substring] = (counts[substring] || 0) + 1;
      }
    }

    // Sort the keys alphabetically
    var keys = Object.keys(counts).sort();

    // Only include characters we saw more than once
    var result = keys.reduce(function(count_array, key) {
      if (counts[key] > 1) {
        count_array.push({
          substring: key,
          count:     counts[key]
        });
      }
      return count_array;
    }, []);

    return result;
  }


  render() {
    var results = this.generate_results(this.props.inputString);
    var resultBoxes = [];

    results.forEach(function(result) {
      resultBoxes.push(
        <ResultBox
          key={result.substring}
          substring={result.substring}
          count={result.count}
        />);
    });
    return (
      <div>
        <div className="results_container_label">
          Duplicate String Checker
        </div>
        <div className="results_container">
          { resultBoxes }
        </div>
      </div>
    );
  }
}

class ExampleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(inputString) {
    this.setState({inputString: inputString});
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="duplicate_string_checker">
        <StringInput onUserInput={this.handleUserInput}/>
        <ResultsContainer inputString={this.state.inputString} />
      </div>
    );
  }
}


export default ExampleView;
