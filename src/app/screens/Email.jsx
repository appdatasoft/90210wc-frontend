import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, Form, FormGroup, Input } from "reactstrap";

const SEND_EMAIL = gql`
  mutation SendEmail($email: String!, $subject: String!, $message: String!) {
    sendEmail(input: { email: $email, subject: $subject, message: $message }) {
      email
    }
  }
`;

const Email = () => {
  const [sendEmail] = useMutation(SEND_EMAIL);
  const [payload, setPayload] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail({
      variables: {
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
      },
    }).then(() => {
      alert(`Email Succesfully send to ${payload.email}`);
      setPayload({
        email: "",
        subject: "",
        message: "",
      });
    });
  };

  return (
    <div className="mt-5 px-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            size="lg"
            type="email"
            name="email"
            placeholder="Email"
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="text"
            name="subject"
            placeholder="Subject"
            value={payload.subject}
            onChange={(e) =>
              setPayload({ ...payload, subject: e.target.value })
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            size="lg"
            type="textarea"
            name="message"
            placeholder="Message"
            value={payload.message}
            onChange={(e) =>
              setPayload({ ...payload, message: e.target.value })
            }
            required
          />
        </FormGroup>
        <Button type="submit" color="primary" size="lg" block>
          Send Email
        </Button>
      </Form>
    </div>
  );
};

export default Email;
