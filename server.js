const express = require('express');
const path = require('path'); // NEW
const cors = require('cors');
const app = express();
const port = 3030;
const axios = require('axios');
const DIST_DIR = path.join(__dirname, './build'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const pagelimit = 500;
app.use(cors());
app.use(express.static(DIST_DIR)); // NEW

const isEmpty = function(value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
const dateParse = (str) => {
  const y = str.substring(0, str.indexOf("년"));
  const m = str.substring(str.indexOf("년") + 1, str.indexOf("월"));
  const d = str.substring(str.indexOf("월") + 1, str.indexOf("일"))
  return new Date(Number(y), Number(m)-1, Number(d));
}

const checkGame = (data) => {
  return (data.type === 'game' || data.type === 'demo') && !isEmpty(data.is_free || data.price_overview) ? true : false
}

const setGenres = (genres, languages) => {
  !isEmpty(languages) && languages.indexOf("한국어") > -1 && genres.push({description:'한국어'});
  return genres.map((item) => item.description).toString();
}

axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json').then((response) => {
  const startIndex = (2 - 1) * pagelimit;
  const endIndex = 2 * pagelimit;
  const data = response.data.applist.apps.slice(startIndex, endIndex);
  let num = 0;
  const timer = setInterval(() => { 
    apiCall();
  }, 180000);
  const apiCall = () => {
    const item = data[num];
    let nums = num + 30;
    for (num = num; num <= nums; num++) {
      const item = data[num];
      axios.get(`https://store.steampowered.com/api/appdetails?appids=${item.appid}&l=koreana`).then((res) => {
        const id = Object.entries(res.data)[0][0];
        const app_data = Object.entries(res.data)[0][1].data;
        if(res.data[item.appid].success && checkGame(res.data[item.appid].data)){
          console.log(id, app_data.name, app_data.supported_languages.indexOf("한국어") > -1)
          axios.get(`https://store.steampowered.com/appreviews/${id}?json=1&language=all&l=koreana`).then((review_res) => {
            const reviews = {
              review_score_desc: review_res.data.query_summary.review_score_desc,
            }
            const items = {
              appid: id,
              name: app_data.name,
              type: app_data.type,
              is_free: app_data.is_free,
              price: app_data.price_overview && app_data.price_overview.final_formatted.replace(/[^0-9]/g,''),
              sale_price: app_data.price_overview && app_data.price_overview.discount_percent,
              genres: !isEmpty(app_data.genres) && setGenres(app_data.genres, app_data.supported_languages),
              date:app_data.release_date.date,
              release_date: !app_data.release_date.coming_soon ? dateParse(app_data.release_date.date) : null,
              supported_languages: app_data.supported_languages.indexOf("한국어") > -1 ? true : false,
            }
            axios.post('http://localhost:1337/apps',Object.assign(items, reviews)).catch((error) => {
              console.log('post------------', error.response.statusText)
            });
            if(app_data.supported_languages && app_data.supported_languages.indexOf("한국어") > -1) {
              const str = app_data.name.trim();
              axios.get(`https://content-youtube.googleapis.com/youtube/v3/search?q=${str}%20%ED%9B%84%EA%B8%B0&key=AIzaSyBxBXVnOw7Y6Fm00wvolthZ65kvxQoD-Ss`).then((list_res) => {
                const items = list_res.data.items.map((item) => {
                  return item.id.videoId
                })
                console.log()
                axios.post('http://localhost:1337/youtubes',{
                  appid:id,
                  youtube_ids:items.toString()
                }).catch((error) => {
                console.log('post2------------', error.response.statusText)
              });
              }).catch((error) => {
                console.log('youtube -------- error', error)
              })
            }
            
          }).catch((error) => {
            console.log('detail ----------', error)
          });;
        }
      }).catch((error) => {
        console.log('alllist ----------', error)
      });
    }
  }
  apiCall();
}).catch((error) => {
  console.log("list",error.response)
})




app.listen(port, function () {
 console.log('App listening on port: ' + port);
});