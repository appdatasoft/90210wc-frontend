import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";

export default class NavC extends Component {
  state = {
    isOpen: false,
    data: {
      ivdrips: [],
      therapies: [],
      services: [],
      teams: [],
    },
  };

  componentDidMount() {
    axios
      .get(
        "https://3usta2en23.execute-api.us-east-1.amazonaws.com/dev/common/menu"
      )
      .then((res) => {
        this.setState({
          ...this.state,
          data: {
            ivdrips: res.data.data.ivdrips,
            therapies: res.data.data.therapies,
            services: res.data.data.services,
            teams: res.data.data.teams,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  toggle = () => this.setState({ ...this.state, isOpen: !this.state.isOpen });

  render() {
    const { ivdrips, therapies, services, teams } = this.state.data;
    const { isOpen } = this.state;
    return (
      <>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            Wellness Center
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  IV - Drip
                </DropdownToggle>
                <DropdownMenu>
                  {ivdrips &&
                    ivdrips.map((i, idx) => (
                      <DropdownItem
                        key={idx}
                        tag={Link}
                        to={`/ivdrip/${i.slug}`}
                      >
                        {i.title}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Therapies
                </DropdownToggle>
                <DropdownMenu>
                  {therapies &&
                    therapies.map((i, idx) => (
                      <DropdownItem
                        key={idx}
                        tag={Link}
                        to={`/therapies/${i.slug}`}
                      >
                        {i.title}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Other Services
                </DropdownToggle>
                <DropdownMenu>
                  {services &&
                    services.map((i, idx) => (
                      <DropdownItem
                        key={idx}
                        tag={Link}
                        to={`/services/${i.slug}`}
                      >
                        {i.title}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Team
                </DropdownToggle>
                <DropdownMenu>
                  {teams &&
                    teams.map((i, idx) => (
                      <DropdownItem key={idx} tag={Link} to={`/team/${i.slug}`}>
                        {i.title}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}
