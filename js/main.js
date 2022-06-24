






$("#sideNavBar a").click(function (e) {
    let section = $(e.target).attr("href");

    if ($(section).offset() != undefined) {
        let offset = $(section).offset().top;

        $("html, body").animate({ scrollTop: offset }, 500);
    }
});