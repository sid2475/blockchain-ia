import React from "react";
import { Form } from "react-bootstrap";
import "../css/number-form.css";

const NumberForm = props => {
  return (
    <Form>
      <div className="numberForm" key={`inline-${props.type} className="mb-3`}>
        <Form.Control
          inline
          type="number"
          min={1}
          max={49}
          name={props.name0}
          value={props.value0}
          onChange={e => props.handleChange(e, props.name0)}
        />

        <Form.Control
          inline
          type="number"
          name={props.name1}
          value={props.value1}
          onChange={e => props.handleChange(e, props.name1)}
        />
        <Form.Control
          inline
          type="number"
          name={props.name2}
          value={props.value2}
          onChange={e => props.handleChange(e, props.name2)}
        />
        <Form.Control
          inline
          type="number"
          name={props.name3}
          value={props.value3}
          onChange={e => props.handleChange(e, props.name3)}
        />
        <Form.Control
          inline
          type="number"
          name={props.name4}
          value={props.value4}
          onChange={e => props.handleChange(e, props.name4)}
        />
      </div>
    </Form>
  );
};

export default NumberForm;
