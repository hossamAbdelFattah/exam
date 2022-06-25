
const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c1cfbb597b6f0999fc0f4180ebf99aaf";
const popularURL    = "https://api.themoviedb.org/3/movie/popular?api_key=c1cfbb597b6f0999fc0f4180ebf99aaf"
const topRatedURL   = "https://api.themoviedb.org/3/movie/top_rated?api_key=c1cfbb597b6f0999fc0f4180ebf99aaf"
const trendingURL   = "https://api.themoviedb.org/3/trending/all/day?api_key=c1cfbb597b6f0999fc0f4180ebf99aaf"
const upcomingURL   = "https://api.themoviedb.org/3/movie/upcoming?api_key=c1cfbb597b6f0999fc0f4180ebf99aaf"

let currentMovies ;

getAndDisplayMovies(nowPlayingURL);



$("#open-close-button").click(function () 
{ 
    if ($("#sideNavBar").offset().left == 0)
    {
        // Close Nav
        $("#navBarSection").animate({left:"-250px"},600);
        $("#sideNavBar li").animate({ opacity: "0", paddingTop: "500px" }, 500);
    }
    else
    {
        // Open Nav
        $("#navBarSection").animate({left:"0px"},600);
        $("#sideNavBar .item1").animate({ opacity: "1", paddingTop: "25px" }, 1100);
        $("#sideNavBar .item2").animate({ opacity: "1", paddingTop: "25px" }, 1200);
        $("#sideNavBar .item3").animate({ opacity: "1", paddingTop: "25px" }, 1300);
        $("#sideNavBar .item4").animate({ opacity: "1", paddingTop: "25px" }, 1400);
        $("#sideNavBar .item5").animate({ opacity: "1", paddingTop: "25px" }, 1500);
        $("#sideNavBar .item6").animate({ opacity: "1", paddingTop: "25px" }, 1600);
    }

    $("#open-close-button").toggleClass("fa-times");
    
});



async function getMovies(url)
{
    let output = await fetch(url);
    let outputJson = await output.json();
    return outputJson.results;
}

function displayMovies(moviesToDisplay, selector) 
{
    let box ='';

    for (const movie of moviesToDisplay) 
    {
       box += `<div class="col-lg-4 col-md-6 shadow">
                    <div class="cover-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                        <div class="image-overlay">
                            <div>
                                <h2>${movie.original_title}</h2>
                                <p>${movie.overview}</p>
                                <p>${movie.vote_average}</p>
                                <p>${movie.release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>`
   
    }

    $(selector).html(box);    
}


async function getAndDisplayMovies(url)
{
    currentMovies =  await getMovies(url);
    displayMovies(currentMovies, "#moviesList");
}




$("#nowPlaying").click(function () 
{ 
    getAndDisplayMovies(nowPlayingURL);
});

$("#popular").click(function () 
{ 
    getAndDisplayMovies(popularURL);
});

$("#topRated").click(function () 
{ 
    getAndDisplayMovies(topRatedURL);
});

$("#trending").click(function () 
{ 
    getAndDisplayMovies(trendingURL);
});

$("#upcoming").click(function () 
{ 
    getAndDisplayMovies(upcomingURL);
});

$("#allMovies").keyup(function () 
{ 
    let movieName = $(this).val();
    let searchURL = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=c1cfbb597b6f0999fc0f4180ebf99aaf&language=en-US&include_adult=false`;
    getAndDisplayMovies(searchURL);
});


$("#word").keyup(function () 
{ 
    let movieName = $(this).val();
    
    if (movieName != "")
    {
        let movieList =  [];
        for (const movie of currentMovies) 
        {
            if(movie.original_title.toLocaleLowerCase().includes(movieName.toLocaleLowerCase()))
            {
                movieList.push(movie);
            }
        }

        if(movieList.length != 0)
        {
            displayMovies(movieList, "#searchResult");
            $("#moviesList").parent().addClass("pt-4").removeClass("pt-0");
        }
        else
        {
            $("#searchResult").html("");
            $("#moviesList").parent().addClass("pt-0").removeClass("pt-4");
        }
    }
    else
    {
        $("#searchResult").html("");
        $("#moviesList").parent().addClass("pt-0").removeClass("pt-4");
    }

});


// $("#name").keyup(userNameValid);
// $("#email").keyup(userEmailValid);
// $("#phone").keyup(userPhoneValid);
// $("#age").keyup(userAgeValid);
// $("#password").keyup(userPasswordValid);
// $("#rePassword").keyup(userRePasswordValid);


// function userNameValid() {
//     return 1 == /^[a-zA-Z0-9]+$/.test(userName.value) ? ((userNameAlert.style.display = "none"), !0) : ((userNameAlert.style.display = "block"), !1);
// }
// function userEmailValid() {
//     return 1 == /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userEmail.value) ? ((userEmailAlert.style.display = "none"), !0) : ((userEmailAlert.style.display = "block"), !1);
// }
// function userPhoneValid() {
//     return 1 == /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value) ? ((userPhoneAlert.style.display = "none"), !0) : ((userPhoneAlert.style.display = "block"), !1);
// }
// function userAgeValid() {
//     return 1 == /^[1-9][0-9]?$|^100$/.test(userAge.value) ? ((userAgeAlert.style.display = "none"), !0) : ((userAgeAlert.style.display = "block"), console.log("dkldkdlkdlk"), !1);
// }
// function userPasswordValid() {
//     return 1 == /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value) ? ((userpasswordAlert.style.display = "none"), !0) : ((userpasswordAlert.style.display = "block"), !1);
// }
// function userRePasswordValid() {
//     return userPassword.value == userRePassword.value ? ((userRepasswordAlert.style.display = "none"), !0) : ((userRepasswordAlert.style.display = "block"), !1);
// }


