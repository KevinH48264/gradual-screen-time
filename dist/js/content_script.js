/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentScript/check.ts":
/*!************************************!*\
  !*** ./src/contentScript/check.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.check = void 0;
const popover_1 = __webpack_require__(/*! ./popover */ "./src/contentScript/popover.ts");
const check = () => {
    const windDownInterval = 15;
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
            const [nowHours, nowMinutes] = now.split(":");
            // console.log("comparing now: ", nowHours, nowMinutes, " to bedtime: ", bedtimeHours, bedtimeMinutes);
            if (nowHours >= bedtimeHours && nowMinutes >= bedtimeMinutes) {
                // console.log("IT IS TIME");
                // calculate total time elapsed
                var timeElapsed = 0;
                var hoursElapsed = parseInt(nowHours) - parseInt(bedtimeHours);
                var minutesElapsed = parseInt(nowMinutes) - parseInt(bedtimeMinutes);
                if (hoursElapsed > 0) {
                    timeElapsed += hoursElapsed * 60;
                }
                if (minutesElapsed > 0) {
                    timeElapsed += minutesElapsed;
                }
                // update the popover status
                const p = document.getElementById("wind-down-popover");
                if (!p) {
                    var popover = (0, popover_1.getPopover)(timeElapsed, windDownInterval);
                    document.body.appendChild(popover);
                }
                else {
                    var opacity = timeElapsed / windDownInterval;
                    p.style.backgroundColor = `rgb(0,0,0, ${opacity})`;
                }
            }
        }
        else {
            if (checkEverySecond != 60000) {
                chrome.storage.local.set({
                    checkEverySecond: 60000,
                });
            }
        }
        setTimeout(exports.check, checkEverySecond); // check the bedtime
    });
};
exports.check = check;
// console.log("hi")
// default check every minute
chrome.storage.local.get("checkEverySecond", function (result) {
    // console.log("this was called!", result.checkEverySecond)
    var checkEverySecond = result.checkEverySecond;
    if (!checkEverySecond) {
        // console.log("setting default check every second")
        checkEverySecond = 60000;
        chrome.storage.local.set({
            checkEverySecond: 60000,
        });
    }
    setTimeout(exports.check, checkEverySecond); // check the bedtime
});


/***/ }),

/***/ "./src/contentScript/popover.ts":
/*!**************************************!*\
  !*** ./src/contentScript/popover.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPopover = void 0;
const getPopover = (timeElapsed, windDownInterval) => {
    var opacity = timeElapsed / windDownInterval;
    console.log("popover was called!");
    // Popover element
    const popover = document.createElement("div");
    popover.style.width = "100%";
    popover.style.height = "100%";
    popover.style.zIndex = "10000000";
    popover.style.backgroundColor = `rgb(0,0,0, ${opacity})`;
    popover.style.position = "fixed";
    popover.style.right = "0";
    popover.style.top = "0";
    popover.style.fontFamily = "Verdana,sans-serif";
    popover.style.color = "rgb(210, 214, 218)";
    popover.style.display = "flex";
    popover.style.alignItems = "center";
    popover.style.justifyContent = "center";
    popover.style.overflow = "hidden";
    //   allowed to click through?
    popover.style.pointerEvents = 'none';
    // standardize fonts
    popover.id = "wind-down-popover";
    return popover;
};
exports.getPopover = getPopover;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const check_1 = __webpack_require__(/*! ./contentScript/check */ "./src/contentScript/check.ts");
(0, check_1.check)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWE7QUFDYixrQkFBa0IsbUJBQU8sQ0FBQyxpREFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELG9DQUFvQztBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsUUFBUTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscURBQXFEO0FBQ3JELEtBQUs7QUFDTDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGlEQUFpRDtBQUNqRCxDQUFDOzs7Ozs7Ozs7OztBQzVFWTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxRQUFRO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7OztVQzNCbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQkFBZ0IsbUJBQU8sQ0FBQywyREFBdUI7QUFDL0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50U2NyaXB0L2NoZWNrLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvcG9wb3Zlci50cyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9jb250ZW50X3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmNoZWNrID0gdm9pZCAwO1xyXG5jb25zdCBwb3BvdmVyXzEgPSByZXF1aXJlKFwiLi9wb3BvdmVyXCIpO1xyXG5jb25zdCBjaGVjayA9ICgpID0+IHtcclxuICAgIGNvbnN0IHdpbmREb3duSW50ZXJ2YWwgPSAxNTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiY2hlY2sgd2FzIGNhbGxlZCFcIilcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJiZWR0aW1lXCIsIFwiY2hlY2tFdmVyeVNlY29uZFwiXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2hlY2tFdmVyeVNlY29uZCwgXCIsIHJlc3VsdC5jaGVja0V2ZXJ5U2Vjb25kKVxyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tR0JcIiwgeyBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9KTtcclxuICAgICAgICB2YXIgYmVkdGltZSA9IHJlc3VsdC5iZWR0aW1lO1xyXG4gICAgICAgIHZhciBjaGVja0V2ZXJ5U2Vjb25kID0gcmVzdWx0LmNoZWNrRXZlcnlTZWNvbmQ7XHJcbiAgICAgICAgaWYgKCFiZWR0aW1lKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2V0dGluZyBkZWZhdWx0IGJlZHRpbWVcIilcclxuICAgICAgICAgICAgYmVkdGltZSA9IFwiMjI6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJub3cgXCIsIG5vdyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJiZWR0aW1lOiBcIiwgYmVkdGltZSk7XHJcbiAgICAgICAgaWYgKGJlZHRpbWUpIHtcclxuICAgICAgICAgICAgLy8gY2hlY2sgZXZlcnkgdGltZSBhIHBlcmNlbnRhZ2Ugb2Ygb3BhY2l0eSBnb2VzIGRvd25cclxuICAgICAgICAgICAgaWYgKGNoZWNrRXZlcnlTZWNvbmQgIT0gKHdpbmREb3duSW50ZXJ2YWwgKiA2MCAqIDEwMDApIC8gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRXZlcnlTZWNvbmQ6ICh3aW5kRG93bkludGVydmFsICogNjAgKiAxMDAwKSAvIDEwMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IFtiZWR0aW1lSG91cnMsIGJlZHRpbWVNaW51dGVzXSA9IGJlZHRpbWUuc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBbbm93SG91cnMsIG5vd01pbnV0ZXNdID0gbm93LnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjb21wYXJpbmcgbm93OiBcIiwgbm93SG91cnMsIG5vd01pbnV0ZXMsIFwiIHRvIGJlZHRpbWU6IFwiLCBiZWR0aW1lSG91cnMsIGJlZHRpbWVNaW51dGVzKTtcclxuICAgICAgICAgICAgaWYgKG5vd0hvdXJzID49IGJlZHRpbWVIb3VycyAmJiBub3dNaW51dGVzID49IGJlZHRpbWVNaW51dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIklUIElTIFRJTUVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxjdWxhdGUgdG90YWwgdGltZSBlbGFwc2VkXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZUVsYXBzZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdXJzRWxhcHNlZCA9IHBhcnNlSW50KG5vd0hvdXJzKSAtIHBhcnNlSW50KGJlZHRpbWVIb3Vycyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWludXRlc0VsYXBzZWQgPSBwYXJzZUludChub3dNaW51dGVzKSAtIHBhcnNlSW50KGJlZHRpbWVNaW51dGVzKTtcclxuICAgICAgICAgICAgICAgIGlmIChob3Vyc0VsYXBzZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUVsYXBzZWQgKz0gaG91cnNFbGFwc2VkICogNjA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWludXRlc0VsYXBzZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZUVsYXBzZWQgKz0gbWludXRlc0VsYXBzZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvcG92ZXIgc3RhdHVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLWRvd24tcG9wb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3BvdmVyID0gKDAsIHBvcG92ZXJfMS5nZXRQb3BvdmVyKSh0aW1lRWxhcHNlZCwgd2luZERvd25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3BvdmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGFjaXR5ID0gdGltZUVsYXBzZWQgLyB3aW5kRG93bkludGVydmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYigwLDAsMCwgJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tFdmVyeVNlY29uZCAhPSA2MDAwMCkge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0V2ZXJ5U2Vjb25kOiA2MDAwMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoZXhwb3J0cy5jaGVjaywgY2hlY2tFdmVyeVNlY29uZCk7IC8vIGNoZWNrIHRoZSBiZWR0aW1lXHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0cy5jaGVjayA9IGNoZWNrO1xyXG4vLyBjb25zb2xlLmxvZyhcImhpXCIpXHJcbi8vIGRlZmF1bHQgY2hlY2sgZXZlcnkgbWludXRlXHJcbmNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcImNoZWNrRXZlcnlTZWNvbmRcIiwgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJ0aGlzIHdhcyBjYWxsZWQhXCIsIHJlc3VsdC5jaGVja0V2ZXJ5U2Vjb25kKVxyXG4gICAgdmFyIGNoZWNrRXZlcnlTZWNvbmQgPSByZXN1bHQuY2hlY2tFdmVyeVNlY29uZDtcclxuICAgIGlmICghY2hlY2tFdmVyeVNlY29uZCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2V0dGluZyBkZWZhdWx0IGNoZWNrIGV2ZXJ5IHNlY29uZFwiKVxyXG4gICAgICAgIGNoZWNrRXZlcnlTZWNvbmQgPSA2MDAwMDtcclxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xyXG4gICAgICAgICAgICBjaGVja0V2ZXJ5U2Vjb25kOiA2MDAwMCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoZXhwb3J0cy5jaGVjaywgY2hlY2tFdmVyeVNlY29uZCk7IC8vIGNoZWNrIHRoZSBiZWR0aW1lXHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFBvcG92ZXIgPSB2b2lkIDA7XHJcbmNvbnN0IGdldFBvcG92ZXIgPSAodGltZUVsYXBzZWQsIHdpbmREb3duSW50ZXJ2YWwpID0+IHtcclxuICAgIHZhciBvcGFjaXR5ID0gdGltZUVsYXBzZWQgLyB3aW5kRG93bkludGVydmFsO1xyXG4gICAgY29uc29sZS5sb2coXCJwb3BvdmVyIHdhcyBjYWxsZWQhXCIpO1xyXG4gICAgLy8gUG9wb3ZlciBlbGVtZW50XHJcbiAgICBjb25zdCBwb3BvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHBvcG92ZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLnpJbmRleCA9IFwiMTAwMDAwMDBcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYigwLDAsMCwgJHtvcGFjaXR5fSlgO1xyXG4gICAgcG9wb3Zlci5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUucmlnaHQgPSBcIjBcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmZvbnRGYW1pbHkgPSBcIlZlcmRhbmEsc2Fucy1zZXJpZlwiO1xyXG4gICAgcG9wb3Zlci5zdHlsZS5jb2xvciA9IFwicmdiKDIxMCwgMjE0LCAyMTgpXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgLy8gICBhbGxvd2VkIHRvIGNsaWNrIHRocm91Z2g/XHJcbiAgICBwb3BvdmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgICAvLyBzdGFuZGFyZGl6ZSBmb250c1xyXG4gICAgcG9wb3Zlci5pZCA9IFwid2luZC1kb3duLXBvcG92ZXJcIjtcclxuICAgIHJldHVybiBwb3BvdmVyO1xyXG59O1xyXG5leHBvcnRzLmdldFBvcG92ZXIgPSBnZXRQb3BvdmVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY2hlY2tfMSA9IHJlcXVpcmUoXCIuL2NvbnRlbnRTY3JpcHQvY2hlY2tcIik7XHJcbigwLCBjaGVja18xLmNoZWNrKSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=