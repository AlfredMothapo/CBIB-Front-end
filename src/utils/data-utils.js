// creates a deep copy of a JS object
export function cloneObject(obj) {
  return (typeof obj === 'object' || Array.isArray(obj)) ? JSON.parse(JSON.stringify(obj)) : obj;
}

// returns true or falsed based on conditions
export function isEmpty(value) {
  return (typeof value !== 'number') && Boolean(value);
}
