export type requestMethod = 'GET' | 'POST' | 'PUT';

export async function makeRequest(
  url: string,
  method: requestMethod,
  body?: any
) {
  const params = {};
  params['Content-Type'] = 'application/json';
  switch (method) {
    case 'GET': {
      return await fetch(url, { method: 'GET', headers: params });
    }
    case 'POST': {
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: params,
      });
    }
    case 'PUT': {
      return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: params,
      });
    }
  }
}

export async function get(url: string) {
  return await (await makeRequest(url, 'GET')).json();
}

export async function post(url: string, body: any) {
  return await (await makeRequest(url, 'POST', body)).json();
}
