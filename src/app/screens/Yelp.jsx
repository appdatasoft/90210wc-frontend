import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import axios from "axios";

const Yelp = () => {
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
        setData(JSON.stringify(res.data.body));
      })
      .catch((err) => {
        alert("Something went wrong please try again!");
        setData(JSON.stringify(err));
      });
  };

  return (
    <div className="mt-3 px-5">
      <h1 className="text-center">Yelp</h1>
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
          <div className="mt-4">
            {data && <Alert color="primary">{data}</Alert>}
          </div>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Yelp;
