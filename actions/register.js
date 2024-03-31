"use server";


export const register = (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('cnfPassword');

  console.log("Register", email, password, name);

  // signUp("credentials", {
  //   email,
  //   password,
  //   name,
  //   redirect: false
  // });
}