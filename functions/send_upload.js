exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'World'
    const data = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: data,
    }
  }