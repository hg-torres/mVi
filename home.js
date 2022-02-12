let trending = "TRENDING_DESC"
let allTimePopular = "POPULARITY_DESC"
let userRated = "SCORE_DESC"
let userFavorited = "FAVOURITES_DESC"

function renderManga(sort) {
  const query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(search: $search, type: MANGA, sort: ${sort}) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          type
          genres
          description
          coverImage {
            extraLarge
            medium
            large
            color
          }
        }
      }
    }
  `

  let variables = {
    page: 1,
    perPage: 12,
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse)
                     .then(handleData)
                     .catch(handleError)

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData({ data }) {
    console.log(data)
  }

  function handleError(error) {
    alert('Error, check console')
    console.error(error)
  }

}

renderManga(userRated)
renderManga(trending)
renderManga(allTimePopular)
renderManga(userFavorited)