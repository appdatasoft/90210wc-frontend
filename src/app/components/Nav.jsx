import React, { useState } from "react";
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

const NavC = ({ data }) => {
  const { ivdrips, therapies, teams, services } = data;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          Beverly Hills
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
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
                    <DropdownItem key={idx} tag={Link} to={`/ivdrip/${i.slug}`}>
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
};

export default NavC;
