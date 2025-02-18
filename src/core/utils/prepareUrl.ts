export const prepareUrl = (
  baseUrl: string,
  params: Record<string, any>
): string => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Append multiple query parameters for array values
      value.forEach((item) => url.searchParams.append(key, item.toString()));
    } else if (value !== undefined && value !== null) {
      // Append single query parameter
      url.searchParams.append(key, value.toString());
    }
  });

  return url.toString();
};
