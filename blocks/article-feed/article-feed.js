/**
 * fetches blog article index.
 * @returns {object} index with data and path lookup
 */
 export async function fetchBlogArticleIndex() {
  const pageSize = 500;

  if (blogIndex.complete) return (blogIndex);

  return fetch(`${getConfig().locale.contentRoot}/query-index.json?limit=${pageSize}&offset=${blogIndex.offset}`)
    .then((response) => response.json())
    .then((json) => {
      const complete = (json.limit + json.offset) === json.total;
      json.data.forEach((post) => {
        blogIndex.data.push(post);
        blogIndex.byPath[post.path.split('.')[0]] = post;
      });
      blogIndex.complete = complete;
      blogIndex.offset = json.offset + pageSize;

      return blogIndex;
    });
}
