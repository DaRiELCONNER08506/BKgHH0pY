// 代码生成时间: 2025-11-01 12:29:09
// Data Dictionary Management System using Gatsby framework
// Filename: dataDictionaryManagement.js

// Import necessary Gatsby dependencies and other libraries
const { graphql, useStaticQuery } = require('gatsby');

// DataDictionary component that will display the data dictionary
const DataDictionary = () => {
  // Destructure the data from GraphQL query
  const { dataDictionary } = useStaticQuery(graphql\`\
    query DataDictionaryQuery {
      dataDictionary {
        id
        name
        description
        entries {
          id
          key
          value
        }
      }
    }
  \`);

  // Error handling if data dictionary data is not found
  if (!dataDictionary) {
    return <div>Error: Data dictionary not found.</div>;
  }

  // Render the data dictionary entries
  return (
    <div>
      <h1>{dataDictionary.name}</h1>
      <p>{dataDictionary.description}</p>
      <ul>
        {dataDictionary.entries.map(entry => (
          <li key={entry.id}>{entry.key}: {entry.value}</li>
        ))}
      </ul>
    </div>
  );
};

// Export the DataDictionary component
module.exports = DataDictionary;
