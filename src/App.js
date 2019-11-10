import React from "react";
import "./static/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AppForm from "./components/AppForm";
import AppList from "./components/AppList";

const axios = require("axios");

const itemList = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: itemList,
      itemsDescriptions: []
    };
  }

  getDataAxios = async () => {
    const response = await axios.get("https://rxnav.nlm.nih.gov/REST/rxcui?name=lipitor");
    const { itemsDescriptions } = this.state;
    this.setState({ itemsDescriptions: itemsDescriptions.concat(response.data) });
    console.log(itemsDescriptions);
    console.log(response.data);
  };

  onFormSubmit = item => {
    const { items } = this.state;
    this.setState({ items: items.concat(item) });
    this.getDataAxios();
  };

  onButtonClick = index => {
    const { items } = this.state;
    this.setState({
      items: items.filter((el, i) => {
        return i !== index;
      })
    });
  };

  render = () => {
    const { items, itemsDescriptions } = this.state;
    return (
      <div className="App">
        <h1 className="App-heading">DrugInteractions.eu</h1>
        <div className="App-card">
          <AppForm items={items} onSubmit={this.onFormSubmit} />
          <hr />
          <AppList
            items={items}
            itemsDescriptions={itemsDescriptions}
            onButtonClick={this.onButtonClick}
          />
        </div>
      </div>
    );
  };
}

export default App;
