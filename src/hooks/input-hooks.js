import { useState } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export const useInputs = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const inputs = Object.keys(initialValues)
    .map((key) => {
      const value = values[key];
      const setValue = (v) => {
        setValues({ ...values, [key]: v });
      };
      return {
        input: {
          value,
          setValue,
          reset: () => setValue(initialValues[key]),
          bind: {
            value,
            onChange: (event) => setValue(event.target.value),
          },
        },
        key,
      };
    })
    .reduce((acc, { input, key }) => {
      acc[key] = input;
      return acc;
    }, {});

  const reset = () => setValues(initialValues);
  const bind = Object.keys(inputs).reduce((acc, key) => {
    acc[key] = inputs[key].bind;
    return acc;
  }, {});
  return { bind, reset, values };
};
