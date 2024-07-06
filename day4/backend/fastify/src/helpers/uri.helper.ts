export function parseUri(query: any) {
  const parsed: any = {};

  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith("filters[")) {
      if (!parsed.filters) {
        parsed.filters = {};
      }
      const filterKey = key.slice(8, -1); // Extract the key from filters[key]
      parsed.filters[filterKey] = value;
    } else if (key.startsWith("params[")) {
      if (!parsed.params) {
        parsed.params = {};
      }
      const paramKey = key.slice(7, -1); // Extract the key from params[key]
      parsed.params[paramKey] = value;
    } else {
      parsed[key] = value;
    }
  }

  return parsed;
}
