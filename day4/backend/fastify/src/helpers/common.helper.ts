type AnyObject = { [key: string]: any };

export function toCamelCase(snakeCaseString: string): string {
  return snakeCaseString.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

export function convertKeysToCamelCase(obj: AnyObject): AnyObject {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {} as AnyObject);
  }
  return obj;
}
