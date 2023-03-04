const { Requester, Validator } = require("@chainlink/external-adapter");

const customError = (data) => {
  if (data.response === "Error") return true;
  return false;
};

const customParams = {
  endpoint: false,
};

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams);
  const jobRunID = validator.validated.id;
  const headers = {
    "X-RapidAPI-Key": "eiSBIvketzmshKAey9hwocnIXkDtp14lvZMjsnkuujtj4hRf7V",
    "X-RapidAPI-Host": "random-user-by-api-ninjas.p.rapidapi.com",
  };

  const url = "https://random-user-by-api-ninjas.p.rapidapi.com/v1/randomuser";

  const params = {
    /*  */
  };
  const config = {
    url,
    params,
    headers,
  };

  Requester.request(config, customError)
    .then((response) => {
      callback(response.status, Requester.success(jobRunID, response));
    })
    .catch((error) => {
      callback(500, Requester.errored(jobRunID, error));
    });
};


module.exports.createRequest = createRequest;
