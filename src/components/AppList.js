import React from "react";
import PropTypes from "prop-types";
import "../static/AppList.scss";

class AppList extends React.Component {
  handleClick = e => {
    const { onButtonClick } = this.props;
    const decimal = 10;
    onButtonClick(parseInt(e.target.id, decimal));
  };

  render() {
    const { items } = this.props;
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
    // const listItemsDescriptions = itemsDescriptions.map((element) => (
    //   <div key={element.toString()}>{element}</div>
    // ));

    return (
      <div>
        <ul className="AppList">{listItems}</ul>
      </div>
    );
  }
}

AppList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  // itemsDescriptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default AppList;
