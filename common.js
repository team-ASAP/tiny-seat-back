const success = (data, message) => {
  return {
    code: 200,
    data: data,
    message: message,
  };
};

const failed = (data, message) => {
  return {
    code: 500,
    data: data,
    message: message,
  };
};

module.exports = { success, failed };
