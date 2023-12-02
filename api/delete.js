"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteEmployeeById = (event, context, callback) => {
  const employeeDNI = +event.pathParameters.id;
  const params = {
    TableName: `EMPLOYEES`,
    Key: { employeeDNI },
    ReturnValues: "ALL_OLD",
  };

  console.log("Deleting Employees table.");
  const onDelete = (err, data) => {
    if (err) {
      console.log(
        `Couldn't delete Employee ${employeeDNI}`,
        JSON.stringify(err, null, 2)
      );
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't delete Employee ${employeeDNI}`,
          err,
        }),
      });
    } else {
      console.log(`Delete succeeded. Employee ${employeeDNI}`);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          OldData: data.Attributes,
        }),
      });
    }
  };

  dynamoDb.delete(params, onDelete);
};
