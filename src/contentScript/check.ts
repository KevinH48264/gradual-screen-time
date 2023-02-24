import { getPopover } from "./popover";

export const check = () => {
    const windDownInterval = 15
    // console.log("check was called!")

    chrome.storage.local.get(["bedtime", "checkEverySecond"], function (result) {
        // console.log("checkEverySecond, ", result.checkEverySecond)

        const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        var bedtime = result.bedtime;
        var checkEverySecond = result.checkEverySecond;

        if (!bedtime) {
            // console.log("setting default bedtime")
            bedtime = "22:00";
        }
    
        // console.log("now ", now);
        // console.log("bedtime: ", bedtime);

        if (bedtime) {
            // check every time a percentage of opacity goes down
            if (checkEverySecond != (windDownInterval * 60 * 1000) / 100) {
                chrome.storage.local.set({
                    checkEverySecond: (windDownInterval * 60 * 1000) / 100,
                });
            }

            const [bedtimeHours, bedtimeMinutes] = bedtime.split(":");
            const [nowHours, nowMinutes] = now.split(":")

            // console.log("comparing now: ", nowHours, nowMinutes, " to bedtime: ", bedtimeHours, bedtimeMinutes);

            if (nowHours >= bedtimeHours && nowMinutes >= bedtimeMinutes) {
                // console.log("IT IS TIME");

                // calculate total time elapsed
                var timeElapsed = 0
                var hoursElapsed = parseInt(nowHours) - parseInt(bedtimeHours)
                var minutesElapsed = parseInt(nowMinutes) - parseInt(bedtimeMinutes)

                if (hoursElapsed > 0) {
                    timeElapsed += hoursElapsed * 60
                }
                if (minutesElapsed > 0) {
                    timeElapsed += minutesElapsed
                }

                // update the popover status
                const p = document.getElementById("wind-down-popover");
                if (!p) {
                    var popover = getPopover(timeElapsed, windDownInterval);
                    document.body.appendChild(popover)
                } else {
                    var opacity = timeElapsed / windDownInterval
                    p.style.backgroundColor = `rgb(0,0,0, ${opacity})`;
                }
            }
        } else {
            if (checkEverySecond != 60000) {
                chrome.storage.local.set({
                    checkEverySecond: 60000,
                });
            }
        }

        setTimeout(check, checkEverySecond); // check the bedtime
    })
}

// console.log("hi")
// default check every minute
chrome.storage.local.get("checkEverySecond", function (result) {
    // console.log("this was called!", result.checkEverySecond)
    var checkEverySecond = result.checkEverySecond;

    if (!checkEverySecond) {
        // console.log("setting default check every second")
        checkEverySecond = 60000
        chrome.storage.local.set({
            checkEverySecond: 60000,
        });
    }

    setTimeout(check, checkEverySecond); // check the bedtime
})
