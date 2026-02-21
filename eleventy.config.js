module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function (value) {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // Limit filter for collections
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Sort by date descending
  eleventyConfig.addFilter("sortByDate", function (arr) {
    return [...arr].sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date);
    });
  });

  // Future events filter (date >= today)
  eleventyConfig.addFilter("futureEvents", function (arr) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return arr.filter((item) => {
      const eventDate = new Date(item.data.date);
      return eventDate >= now;
    });
  });

  // Sort by date ascending (for events)
  eleventyConfig.addFilter("sortByDateAsc", function (arr) {
    return [...arr].sort((a, b) => {
      return new Date(a.data.date) - new Date(b.data.date);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
