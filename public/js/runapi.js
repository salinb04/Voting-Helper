$(document).ready(function () {
    function runapi(categories) {
        var settings = {
            async: true,
            crossDomain: true,
            url:
                'https://bing-news-search1.p.rapidapi.com/news?count=3&cc=en-US&safeSearch=Off&category=' + categories + '&textFormat=Raw',
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
                'x-rapidapi-key': 'd9abda0b01msh10fa66d53536a31p1b2d4cjsn4a7ff0377137',
                'x-bingapis-sdk': 'true',
            },
        };

        $.ajax(settings).done(function (newsResponse) {
            for (let i = 0; i < 3; i++) {
                var newsBlock = $("<div id='news-block'>");
                $('#news').append(newsBlock);

                var newsTitle = $("<h4 class='news-title'>").text(
                    newsResponse.value[i].name
                );
                var newsSource = $("<p class='news-source'>").text(
                    'source: ' + newsResponse.value[i].provider[0].name
                );
                var newsImage = $(
                    "<img class='news-pic' src='" +
                    newsResponse.value[i].image.thumbnail.contentUrl +
                    "'>"
                );
                var newsDescription = $("<p class='news-description'>").text(
                    newsResponse.value[i].description
                );
                var newsUrl = $(
                    "<a class='news-url' href=" +
                    newsResponse.value[i].url +
                    " target='_blank'>"
                ).text('read more here');

                newsBlock.append(newsTitle, newsSource, newsImage, newsDescription, newsUrl);
                console.log(newsResponse);
            }
        });
    }
    $("#save9").click(function () {
        var categories = "business"
        runapi(categories);
        var categories = "entertainment"
        runapi(categories);
        var categories = "health"
        runapi(categories);
        var categories = "politics"
        runapi(categories);
        var categories = "science"
        runapi(categories);
        var categories = "sports"
        runapi(categories);
    })
});
// business entertainment health politics science sports