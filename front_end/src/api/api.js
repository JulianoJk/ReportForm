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

// export const newReportAPI = async ({
//   dateReported,
//   time,
//   campusLocation,
//   status,
//   otherType,
//   sectionTwoType,
//   treatment,
//   damagedOrLostItems,
//   descriptionDamagesOrItemsLost,
//   reportCompletedBy,
//   userEmail,
//   userName,
// }) => {
//   try {
//     const response = await fetch(URL + "api/newReport", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         dateReported: dateReported,
//         time: time,
//         campusLocation: campusLocation,
//         // status: status,
//         otherType: otherType,
//         // sectionTwoType: sectionTwoType,
//         // treatment: treatment,
//         // damagedOrLostItems: damagedOrLostItems,
//         // descriptionDamagesOrItemsLost: descriptionDamagesOrItemsLost,
//         // reportCompletedBy: reportCompletedBy,
//         userEmail: userEmail,
//         userName: userName,
//       }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return;
//   }
// };

// export const newReportAPI = async ({
//   dateReported,
//   time,
//   campusLocation,
//   status,
//   otherType,
//   sectionTwoType,
//   treatment,
//   damagedOrLostItems,
//   descriptionDamagesOrItemsLost,
//   reportCompletedBy,
//   userEmail,
//   userName,
// }) => {
//   // I want to print all the props here
//   console.log(
//     dateReported,
//     time,
//     campusLocation,
//     status,
//     otherType,
//     sectionTwoType,
//     treatment,
//     damagedOrLostItems,
//     descriptionDamagesOrItemsLost,
//     reportCompletedBy,
//     userEmail,
//     userName
//   );
// };
