// Document Ready
$(function () {
    getData()
});

function getData() {
    var buster = Math.floor((Math.random() * 1000) + 1);

    // Get the data from LCRA
    $.getJSON("data.json?cb" + buster,
        function (data, textStatus, jqXHR) {
            console.log(data.siteName);
            console.log("Data as of " + data.records[0].dateTime);
            console.log("Current: " + data.records[0].value1 + " ft");
            console.log("Operating Max: " + data.lakeOperatingRangeMax + " ft");

            setWaterLevel(data);
        }
    );

    setTimeout(getData, 1000 * 60 * 5); // Run again in 5 minutes
}

function setWaterLevel(data) {
    var maxLevel = data.lakeOperatingRangeMax;
    var curLevel = data.records[0].value1;
    var timestamp = new Date(data.records[0].dateTime);

    document.querySelector("#max-level-text").textContent = "Max Operating Level: " + maxLevel + " ft";
    document.querySelector("#water-level-text").textContent = "Current Level: " + curLevel + " ft";

    // Use -400 to make the bottom of the screen act like 400ft
    // 681 feet is 80% of the screen
    var ratio = ((curLevel - 400) / (maxLevel - 400)) * 80.0;
    console.log(ratio);
    document.querySelector("#water-level").style.height = ratio + "%";
    document.querySelector("#water-level-still").style.height = ratio + "%";

    if (curLevel >= maxLevel) {
        document.querySelector("#heading").textContent = "Yep, it's full.";
    } else {
        var diff = (maxLevel - curLevel).toFixed(2);
        document.querySelector("#heading").textContent = "Nope, " + diff + " ft to full.";
    }

    document.querySelector("#timestamp").textContent = "Latest data: " + timestamp.toLocaleString();
}