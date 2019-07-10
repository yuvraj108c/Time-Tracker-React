const postToServer = async (url, data) => {
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
};

export default postToServer;
