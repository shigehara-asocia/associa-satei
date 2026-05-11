exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const API_KEY = '096dda8f47f34e91abf34030efe8d5e0';
  const BASE_URL = 'https://www.reinfolib.mlit.go.jp/ex-api/external';

  const { endpoint, ...params } = event.queryStringParameters || {};

  if (!endpoint) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'endpoint parameter is required' })
    };
  }

  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/${endpoint}${query ? '?' + query : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
