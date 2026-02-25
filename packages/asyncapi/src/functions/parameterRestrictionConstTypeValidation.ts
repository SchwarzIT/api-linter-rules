export const parameterRestrictionConstTypeValidation = (input: any) => {
  if (typeof input !== "string" && typeof input !== "number") {
    return [
      {
        message: "Value must be string or number !",
      },
    ];
  }
};
