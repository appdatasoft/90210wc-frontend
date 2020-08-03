import React, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $title: String!
    $message: String!
    $start: String!
    $end: String!
  ) {
    createAppointment(
      input: { title: $title, message: $message, start: $start, end: $end }
    ) {
      title
    }
  }
`;

const GET_APPOINTMENTS = gql`
  query GetAppointments {
    getAppointments {
      title
      message
      _id
      start
      end
    }
  }
`;

const Appointment = () => {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const { loading, error, data } = useQuery(GET_APPOINTMENTS);
  const [showLoader, setShowloader] = useState(true);
  const [modal, setModal] = useState(false);
  const [appointment, setAppointment] = useState({
    title: "",
    message: "",
    start: null,
    end: null,
  });

  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "Interview",
      message: "MERN Stack Interview",
    },
    {
      start: moment().add(6, "day"),
      end: moment().add(6, "day"),
      title: "Interview",
      message: "MERN Stack Interview",
    },
  ]);

  const toggle = () => setModal(!modal);

  const handleSelectEvent = (slotInfo) => {
    toggle();
    setAppointment({
      ...appointment,
      start: slotInfo.start,
      end: slotInfo.start,
    });
  };

  const onChange = (date) =>
    setAppointment({ ...appointment, start: date, end: date });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointment({
      variables: {
        title: appointment.title,
        message: appointment.message,
        start: appointment.start,
        end: appointment.end,
      },
    }).then(() => {
      toggle();
      alert(`Appointment Created Successfully`);
      setAppointment({
        title: "",
        message: "",
        start: null,
        end: null,
      });
    });
  };

  if (loading) return null;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Appointment</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={appointment.title}
                onChange={(e) =>
                  setAppointment({ ...appointment, title: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="text"
                name="message"
                id="message"
                placeholder="message"
                value={appointment.message}
                onChange={(e) =>
                  setAppointment({ ...appointment, message: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Date and Time</Label>
              <div>
                <DateTimePicker onChange={onChange} value={appointment.start} />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Create
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Calendar
        onSelectSlot={handleSelectEvent}
        // onSelectEvent={handleEventSelect}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        selectable={true}
      />
    </div>
  );
};

export default Appointment;
