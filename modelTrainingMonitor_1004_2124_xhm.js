// 代码生成时间: 2025-10-04 21:24:32
// Import required modules
const { useInterval } = require('react-use');
const axios = require('axios');

// Configuration for the model training API
const TRAINING_API_URL = 'http://localhost:5001/train/model';
const POLL_INTERVAL = 3000; // Poll every 3 seconds

// Utility function to fetch training status
const fetchTrainingStatus = async () => {
  try {
    const response = await axios.get(TRAINING_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching training status:', error);
    throw error;
  }
};

// React hook to monitor training progress
const useModelTrainingMonitor = () => {
  const [status, setStatus] = React.useState(null);
  const [error, setError] = React.useState(null);

  // Fetch training status and update state
  const fetchAndSetStatus = async () => {
    try {
      const trainingStatus = await fetchTrainingStatus();
      setStatus(trainingStatus);
    } catch (error) {
      setError(error);
    }
  };

  // Use the useInterval hook to poll the training status
  useInterval(fetchAndSetStatus, POLL_INTERVAL);

  return { status, error };
};

// React component to display training status
const ModelTrainingMonitor = () => {
  const { status, error } = useModelTrainingMonitor();

  if (error) {
    return <div>Error fetching training status: {error.message}</div>;
  }
  if (!status) {
    return <div>Checking training status...</div>;
  }
  if (status.complete) {
    return <div>Training complete. Final accuracy: {status.accuracy}</div>;
  }
  return <div>Training in progress. Current accuracy: {status.accuracy}</div>;
};

export default ModelTrainingMonitor;