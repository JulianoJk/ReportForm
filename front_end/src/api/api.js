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

export const registerAPI = async ({
  username,
  password,
  email,
  name,
  role,
  site,
}) => {
  try {
    const response = await fetch(URL + "api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name,
        role: role,
        site: site,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return;
  }
};

export const newReportAPI = async (formData) => {
  try {
    const response = await fetch(URL + "api/newReport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return;
  }
};