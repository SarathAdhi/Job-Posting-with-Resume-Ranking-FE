import ShortUniqueId from "short-unique-id";

export const uuid = (length = 10) => {
  const uid = new ShortUniqueId({ length });
  return uid();
};
