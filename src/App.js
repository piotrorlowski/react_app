import React from "react";
import "./static/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AppForm from "./components/AppForm";
import AppList from "./components/AppList";

const itemList = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: itemList
    };
  }

  onFormSubmit = item => {
    const { state } = this.state;
    this.setState({ items: state.items.concat(item) });
  };

  onButtonClick = index => {
    const { state } = this.state;
    this.setState({
      items: state.items.filter((el, i) => {
        return i !== index;
      })
    });
  };

  render = () => {
    const { items } = this.state;
    return (
      <div className="App">
        <h1 className="App-heading">App</h1>
        <div className="App-card">
          <AppForm items={items} onSubmit={this.onFormSubmit} />
          <hr />
          <AppList items={items} onButtonClick={this.onButtonClick} />
        </div>
      </div>
    );
  };
}

export default App;
