const URL = "http://localhost:5001/";
export const loginAPI = async ({ email, password }) => {
  try {
    const response = await fetch(URL + "api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return;
  }
};
