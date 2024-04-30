export const GET = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const POST = async <R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = res.json();
  return data;
};

export const PUT = async <R, P>(url: string, body: P): Promise<R> => {
  console.log("PUT:", { body });
  const res = await fetch(url, {
    // mode: "no-cors",
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control":'',
    },
  });
  console.log({ res });
  const data = res.json();
  console.log({ data });
  return data;
};

export const DELETE = async <R>(url: string): Promise<R> => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = res.json();
  return data;
};
