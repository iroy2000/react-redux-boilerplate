const isEmpty = value => value === undefined || value === null || value === '';
function join(rules) {
  return (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];
}

export function email(value) {
  // Let's not start a debate on email regex! This one is quite standard
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }

  return null;
}

export function phone(value: string) {
  // Let's not start a debate on phone regex! This one is the best I can find, the best way to
  // do it correctly is utilizing a third party verification, but for our use case, it is
  // just overkill
  if (!isEmpty(value) && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g.test(value)) {
    return 'Invalid phone number';
  }

  return null;
}

export function required(value: string) {
  if (isEmpty(value)) {
    return 'Required';
  }

  return null;
}

export function minLength(min: number) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }

    return null;
  };
}

export function maxLength(max: number) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }

    return null;
  };
}

export function integer(value: string|number) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }

  return null;
}

export function oneOf(enumeration) {
  return (value) => {
    if (!enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }

    return null;
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }

    return null;
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
