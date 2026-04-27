export const createSlug = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
};

export const createUniqueSlug = async (Model, value, excludeId = null) => {
  const baseSlug = createSlug(value) || "item";
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const exists = await Model.exists(query);
    if (!exists) return slug;

    slug = `${baseSlug}-${count}`;
    count += 1;
  }
};

export default createSlug;
