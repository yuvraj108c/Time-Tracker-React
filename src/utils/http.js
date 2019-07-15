const http = {
  get: async url => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  },
  post: async (url, data) => {
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      let response = await res.json();
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }
};

export default http;
