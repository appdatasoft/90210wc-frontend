import { gql } from "@apollo/client";

export const getMenuQuery = gql `
  query GetMenuData {
    getIvdrips {
      title
      slug
      description
    }
    getServices {
      title
      slug
      description
    }
    getTeams {
      title
      slug
      description
    }
    getTherapies {
      title
      slug
      description
    }
  }
`;

export const getAppointmentsQuery = gql `
  {
    getAppointments {
      _id
      title
      message
      start
      end
    }
  }
`;