const genSection = (category, content) => `
<section> 
  <h2>${category}</h2>
  <div class="row">
    ${content}
  </div>
  <hr>
</section>
`;

const genArticle = (imgURL, title, articleLink, outlet) => `
<div class="col-4">
  <div class="card">
    <img src="${imgURL}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${outlet}</p>
      <a href="${articleLink}" class="btn btn-primary">View Article</a>
    </div>
  </div>
</div>
`;

$(document).ready(() => {
  $.ajax("/api/news").then((data) => {
    console.log(data);
    var body = "";

    Object.keys(data).forEach((category) => {
      var articles = "";

      data[category].forEach(({ urlToImage, title, url, source }) => {
        var article = genArticle(urlToImage, title, url, source.name);
        articles += article;
      });

      body += genSection(category, articles);
    });

    $("#news").html(body);
  });
});
