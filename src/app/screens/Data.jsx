import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

const Data = () => {
  const [data, setData] = useState();

  const [payload, setPayload] = useState({
    keyword: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://nl7ntow788.execute-api.us-east-2.amazonaws.com/default/lambda_fargate?keyword=${payload.keyword}&city=${payload.city}`
      )
      .then((res) => {
        setPayload({
          keyword: "",
          city: "",
        });
        setData(res.data);
      })
      .catch((err) => {
        alert("Internal Server Error!");
        setData(JSON.stringify(err));
      });
  };

  return (
    <div className="mt-5 px-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={payload.keyword}
            onChange={(e) =>
              setPayload({ ...payload, keyword: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="city"
            placeholder="City"
            value={payload.city}
            onChange={(e) => setPayload({ ...payload, city: e.target.value })}
            required
          />
        </FormGroup>
        <Button type="submit" color="primary" size="lg" block>
          Get Data
        </Button>
        <FormGroup>
          <div>{data}</div>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Data;
