// $(document).ready(function(){
//   const API_KEY = "AIzaSyD7tmIrwDj0HAD_bMNDOQ8ImUmax_day1I";
//   let video = ''
  

//   $("form").submit(function(event){
//     event.preventDefault()

//     let search = $("#search").val()

//   videoSearch(API_KEY,search,10)
//   })

//   function videoSearch(key, search, maxResults){
//     $("#videos").empty()
//     $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){
//       data.items.forEach(item => {
// video = `
// <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
// `
// $("#videos").append(video)
//       })
//     })
//   }
// })

$(document).ready(function(){
  const API_KEY = "AIzaSyCsVxQ2HZ7Gs13nfcibRghyfwNKeenBfaQ";
  let video = '';
  let nextPageToken = '';
  let prevPageToken = '';

  $("form").submit(function(event){
    event.preventDefault();
    let search = $("#search").val();
    videoSearch(API_KEY, search, 10);
  });

  $("#nextBtn").click(function(event){
    event.preventDefault();
    nextPageSearch(API_KEY, 10);
  });

  $("#prevBtn").click(function(event){
    event.preventDefault();
    prevPageSearch(API_KEY, 10);
  });

  function videoSearch(key, search, maxResults){
    $("#videos").empty();
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){
      nextPageToken = data.nextPageToken;
      prevPageToken = data.prevPageToken;
      data.items.forEach(item => {
        let viewCount = item.statistics && item.statistics.viewCount ? item.statistics.viewCount : "N/A";
        video = `
          <div class="video-item">
            <iframe max-width="360" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <h2>${item.snippet.title}</h2>
            <p>${item.snippet.description}</p>
            <p>Youtube.com</p>
          </div>
        `;
        $("#videos").append(video);
      });
      checkPaginationButtons();
    });
  }
  

  function nextPageSearch(key, maxResults) {
    $("#videos").empty();
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + $("#search").val() + "&pageToken=" + nextPageToken,function(data){
      nextPageToken = data.nextPageToken;
      prevPageToken = data.prevPageToken;
      data.items.forEach(item => {
        let viewCount = item.statistics && item.statistics.viewCount ? item.statistics.viewCount : "N/A";
        video = `
          <div class="video-item">
            <iframe max-width="360" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <h2>${item.snippet.title}</h2>
            <p>${item.snippet.description}</p>
            <p>Youtube.com</p>
          </div>
        `;
        $("#videos").append(video);
      });
      checkPaginationButtons();
    });
  }

  function prevPageSearch(key, maxResults) {
    $("#videos").empty();
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + $("#search").val() + "&pageToken=" + prevPageToken,function(data){
      nextPageToken = data.nextPageToken;
      prevPageToken = data.prevPageToken;
      data.items.forEach(item => {
        let viewCount = item.statistics && item.statistics.viewCount ? item.statistics.viewCount : "N/A";
        video = `
          <div class="video-item">
            <iframe max-width="360" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <h2>${item.snippet.title}</h2>
            <p>${item.snippet.description}</p>
            <p>Youtube.com</p>
          </div>
        `;
        $("#videos").append(video);
      });
      checkPaginationButtons();
    });
  }

  function checkPaginationButtons() {
    if (nextPageToken) {
      $("#nextBtn").show();
    } else {
      $("#nextBtn").hide();
    }
    if (prevPageToken) {
      $("#prevBtn").show();
    } else {
      $("#prevBtn").hide();
    }
  }
});


