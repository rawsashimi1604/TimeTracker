function setHTMLElements(JSONData, timeframe) {
    for (let dat of JSONData) {
        const dataTitle = dat.title.toLowerCase().replace(" ", "-");
        const section = $(`.${dataTitle}`);
        const sectionHours = section.find(".statistics-hours");
        sectionHours.html(`${dat.timeframes[timeframe].current}hrs`);

        const sectionPrevHours = section.find(".statistics-prev-hours");
        sectionPrevHours.html(`Last Week - ${dat.timeframes[timeframe].previous}hrs`);
    }
}

function displayTimeframe(path) {
    fetch(path)
        .then((res) => {
            return res.json();
        })
        .then(function (data) {
            // Get JSON data from local file.
            const jsonData = data;

            // Set landing page to weekly select.
            setHTMLElements(jsonData, "weekly");
            $(".timeframes span").removeClass('toggle-white');
            $(".selector-weekly").addClass("toggle-white");
            
            // Execute each time timeframe is clicked.
            $(".timeframes span").on("click", function() {
                $(".timeframes span").removeClass('toggle-white');
                $(this).addClass("toggle-white");
                const timeframe = $(this).text().toLowerCase();    
                setHTMLElements(jsonData, timeframe);
        });
    })
}

$(document).ready(function() {
    displayTimeframe('./data.json');
});