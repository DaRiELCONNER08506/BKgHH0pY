// 代码生成时间: 2025-09-23 07:13:02
// Import necessary Gatsby functions
const { onPreBootstrap } = require('gatsby');

// Define a function to log errors
const logError = (error) => {
  console.error('Error caught:', error);
  // Here you can integrate with an external logging service like Sentry, LogRocket, etc.
  // For example:
  // Sentry.captureException(error);
};

// Define a function to handle uncaught exceptions
const handleUncaughtException = (error) => {
  logError(error);
  // Perform any necessary cleanup
  // Optionally, re-throw the error or handle it in a custom way
};

// Define a function to handle unhandled rejections
const handleUnhandledRejection = (reason) => {
  logError(reason);
  // Perform any necessary cleanup
  // Optionally, handle the rejection in a custom way
};

// Use Gatsby's onPreBootstrap lifecycle hook to set up error handlers
onPreBootstrap(() => {
  process.on('uncaughtException', handleUncaughtException);
  process.on('unhandledRejection', handleUnhandledRejection);
});

// Export the error logger functions for use elsewhere in the application
module.exports = {
  logError,
  handleUncaughtException,
  handleUnhandledRejection
};