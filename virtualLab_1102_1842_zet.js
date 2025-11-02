// 代码生成时间: 2025-11-02 18:42:50
// Import necessary modules and components
const React = require('react');
const { graphql, Link } = require('gatsby');
const PropTypes = require('prop-types');

// VirtualLab component represents the main view of the virtual lab
const VirtualLab = ({ data }) => {
  if (!data) {
    // Handle the case where data is not available
    return <div>Virtual lab data not available.</div>;
  }

  const { edge } = data.prismicVirtualLab;
  if (!edge) {
    // Handle the case where prismic data is not available
    return <div>Virtual lab data not found.</div>;
  }

  const { html } = edge.node;
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
};

// Prop types for the VirtualLab component
VirtualLab.propTypes = {
  data: PropTypes.object.isRequired,
};

// GraphQL query to fetch data from Prismic
const query = graphql"
  query VirtualLabQuery {
    prismicVirtualLab {
      id
      html
   }
  }";

// Export the VirtualLab component and the query
module.exports = {
  VirtualLab,
  query,
};
