$("#save").on("click", () => {
  const selected = $("input:checked");
  const categories = [];

  selected.each(function() {
    categories.push(this.name);
  });

  updateUserCategories(categories);
});

// On some submit send to POST /api/categories
function updateUserCategories(categories) {
  fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categories: categories }), // body data type must match "Content-Type" header
  });
}
