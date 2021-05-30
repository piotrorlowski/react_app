import React from "react";
import PropTypes from "prop-types";
import "../static/AppForm.scss";
import { Form } from "react-bootstrap";

class AppForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      isElementListed: false
    };
  }

  handleSubmit = e => {
    const { item, isElementListed } = this.state;
    const { items, onSubmit } = this.props;
    const checkIfElementIsListed = element => element === item;

    this.setState({ isElementListed: items.some(checkIfElementIsListed) });

    if (!isElementListed && item !== "") {
      onSubmit(item);
      this.setState({ item: "" });
    }

    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ item: e.target.value });
  };

  render() {
    const { item, isElementListed } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="AppForm">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Drug name</Form.Label>
          <Form.Control
            value={item}
            onChange={this.handleChange}
            type="text"
            placeholder="Type drug name and hit enter"
          />
        </Form.Group>
        <p className="text-danger">{isElementListed ? "This element is listed already." : ""}</p>
      </Form>
    );
  }
}

AppForm.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AppForm;
