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
      itemInteractions: [],
      isLoading: false
    };
  }

  getItemNormId = async itemName => {
    const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${itemName}`);
    const prop = "idGroup";
    const { [prop]: item } = response.data;
    if (item && item.rxnormId) {
      return item.rxnormId[0];
    }
    return null;
  };

  getItemInteraction = async normId => {
    const response = await axios.get(
      `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${normId}&sources=DrugBank`
    );
    if (
      response.data &&
      response.data.interactionTypeGroup &&
      response.data.interactionTypeGroup[0].interactionType
    ) {
      const interactions = [
        ...new Set(
          response.data.interactionTypeGroup[0].interactionType[0].interactionPair.map(
            element => element.description
          )
        )
      ];
      return interactions;
    }
    return ["Not found"];
  };

  onFormSubmit = async item => {
    this.setState({ isLoading: true, items: [], itemInteractions: [] });
    const itemNormId = await this.getItemNormId(item);
    if (itemNormId) {
      const interactions = await this.getItemInteraction(itemNormId);
      this.setState({
        items: [item],
        itemInteractions: interactions,
        isLoading: false
      });
    } else {
      this.setState({
        items: [],
        itemInteractions: ["Wrong drug name"],
        isLoading: false
      });
    }
  };

  onButtonClick = index => {
    const { items } = this.state;
    this.setState({
      items: items.filter((el, i) => i !== index),
      itemInteractions: []
    });
  };

  render = () => {
    const { items, itemInteractions, isLoading } = this.state;
    const heading = "Drug Interactions";
    return (
      <div className="App">
        <h1 className="App-heading">{heading}</h1>
        <div className="App-card">
          <AppForm items={items} onSubmit={this.onFormSubmit} />
          <hr />
          <AppList
            isLoading={isLoading}
            items={items}
            itemInteractions={itemInteractions}
            onButtonClick={this.onButtonClick}
          />
        </div>
      </div>
    );
  };
}

export default App;
