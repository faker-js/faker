export function slugify(value: string): string {
  // Copied from https://github.com/vuejs/docs/blob/b392b068fb893e3ac6079710fe34decbde7a3be3/src/api/ApiIndex.vue#L50-L65
  return (
    value
      // Replace special characters
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // Remove continuous separators
      .replace(/\-{2,}/g, '-')
      // Remove prefixing and trailing separators
      .replace(/^\-+|\-+$/g, '')
      // ensure it doesn't start with a number (like #123)
      .replace(/^(\d)/, '_$1')
      // lowercase
      .toLowerCase()
  );
}
