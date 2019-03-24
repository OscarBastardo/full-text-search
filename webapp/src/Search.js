import React, { Component } from 'react';
import './Search.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      results: []
    }
    this.keyPress = this.keyPress.bind(this);    
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      results: []
    })
    this.nameInput.focus();
  }

  handleChange(e) {
    this.setState({
      searchString: e.target.value
    })
  }

  async keyPress(e) {
    if (e.key === 'Enter') {
      const encodedSearchString = this.state.searchString.split(" ").join("+");
      const response = await fetch(`/search?query=${encodedSearchString}`);
      if (response.status === 200) {
        const results = await response.json();
        this.setState({
          results
        })
      } else {
        this.setState({
          results: [{
            id: 0,
            body: 'No results'
          }]
        })
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Full Text Search</h3>
        <div>
          <input
            type="text"
            value={this.state.searchString}
            onKeyDown={this.keyPress}
            onChange={this.handleChange}
            placeholder="Type search here"
            ref={(input) => { this.nameInput = input; }} 
          />
          <ul>
            {this.state.results.map(result => {
              return (
                <li key={result.id}>
                  <a href={result.link}>{result.body}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
