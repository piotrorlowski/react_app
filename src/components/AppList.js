import React from "react";
import PropTypes from "prop-types";
import "../static/AppList.scss";
import { Spinner } from "react-bootstrap";

class AppList extends React.Component {
  handleClick = e => {
    const { onButtonClick } = this.props;
    const decimal = 10;
    onButtonClick(parseInt(e.target.id, decimal));
  };

  render() {
    const { items, itemInteractions, isLoading } = this.props;
    const listItems = items.map((element, index) => (
      <li id={index} key={element.toString()} className="AppList-element">
        <span className="AppList-elementName">{element}</span>
        <button
          id={index}
          onClick={this.handleClick}
          type="button"
          className="AppList-button m-buttonReset"
        >
          <i
            onClick={e => {
              e.stopPropagation();
            }}
            role="presentation"
            className="AppList-buttonIcon material-icons"
          >
            clear
          </i>
        </button>
      </li>
    ));
    const interactions = itemInteractions.map(element => (
      <li className="AppList-element" key={element.toString()}>
        {element}
      </li>
    ));

    return (
      <div>
        <ul className="AppList">{listItems}</ul>
        {isLoading ? (
          <Spinner className="AppList-spinner" animation="grow" />
        ) : (
          <ul className="AppList">{interactions}</ul>
        )}
      </div>
    );
  }
}

AppList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  itemInteractions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default AppList;
