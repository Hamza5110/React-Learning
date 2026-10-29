export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function makeUniqueSlug(Model, baseSlug, excludeId = null) {
  let slug = baseSlug || "course";
  let count = 1;

  while (true) {
    const existing = await Model.findOne({ slug });
    if (!existing || (excludeId && existing._id.equals(excludeId))) {
      return slug;
    }
    slug = `${baseSlug}-${count++}`;
  }
}
