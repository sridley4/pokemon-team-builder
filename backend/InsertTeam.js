'use strict';

var AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'

  const data = JSON.parse(event.body);
  
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'teamId': a unique id passed by the user
    // - 'pokemon#': name of pokemon
    // - 'pokemon#Picture': metadata of picture of pokemon
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      teamId: data.teamId,
      pokemon1: data.pokemon.pokemon1,
      pokemon1Picture: data.pokemon.pokemon1Picture,
      pokemon2: data.pokemon.pokemon2,
      pokemon2Picture: data.pokemon.pokemon2Picture,
      pokemon3: data.pokemon.pokemon3,
      pokemon3Picture: data.pokemon.pokemon3Picture,
      pokemon4: data.pokemon.pokemon4,
      pokemon4Picture: data.pokemon.pokemon4Picture,
      pokemon5: data.pokemon.pokemon5,
      pokemon5Picture: data.pokemon.pokemon5Picture,
      pokemon6: data.pokemon.pokemon6,
      pokemon6Picture: data.pokemon.pokemon6Picture,
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, function(err, data){
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (err) {
      console.log(err)
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    console.log("Successful")
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
