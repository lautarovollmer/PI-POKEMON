export function validate(input) {
  let errors = {};
  for (let key in input) {
    if (key !== "name" && key !== "image") {
      if (!input[key]) {
        errors[key] = "is required";
      } else if (isNaN(input[key])) {
        errors[key] = "must be a number";
      }
    } else {
      if (!input[key] && key !== "image") {
        errors[key] = "name is required";
      } else if (/\d/.test(input[key] && key !== "image")) {
        errors[key] = "only letters";
      }
    }
  }
  return errors;
}
