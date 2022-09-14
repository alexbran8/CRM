module.exports = (sequelize, type) => {
  const FieldValues = sequelize.define(
    "field_values",
    {
      field: { type: type.STRING },
      value: { type: type.STRING },
      constraintField: {type: type.STRING},
      constraintValue: {type: type.STRING},
    }
    );
    return FieldValues;
  };
  