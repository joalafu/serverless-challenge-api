"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getEmployeeById = (event, context, callback) => {
  const employeeDNI = +event.pathParameters.id;
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
  };

  console.log("Getting Employees table.");
  const onGet = (err, data) => {
    if (err) {
      console.log(`Couldn't get Employee ${employeeDNI}`, JSON.stringify(err, null, 2));
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't get Employee ${employeeDNI}`,
          err,
        }),
      });
    } else {
      console.log(`Get succeeded. Employee ${employeeDNI}`);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
    }
  };

  dynamoDb.get(params, onGet);
};
