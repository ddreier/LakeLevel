// Document Ready
$(function () {
    // Get the data from LCRA
    $.getJSON("data.json",
        function (data, textStatus, jqXHR) {
            console.log(data.siteName);
            console.log("Data as of " + data.records[0].dateTime);
            console.log("Current: " + data.records[0].value1 + " ft");
            console.log("Operating Max: " + data.lakeOperatingRangeMax + " ft");

            setWaterLevel(data);
        }
    );
});

function setWaterLevel(data) {
    var maxLevel = data.lakeOperatingRangeMax;
    var curLevel = data.records[0].value1;
    var timestamp = new Date(data.records[0].dateTime);

    document.querySelector("#max-level-text").textContent = "Max Operating Level: " + maxLevel + " ft";
    document.querySelector("#water-level-text").textContent = "Current Level: " + curLevel + " ft";

    var ratio = (curLevel / maxLevel) * 85.0;
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