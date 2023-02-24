/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/contextMenu.ts":
/*!***************************************!*\
  !*** ./src/background/contextMenu.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contextMenu = void 0;
const check_1 = __webpack_require__(/*! ../contentScript/check */ "./src/contentScript/check.ts");
const contextMenu = () => {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        (0, check_1.check)();
    });
    chrome.tabs.onCreated.addListener(function (tab) {
        (0, check_1.check)();
    });
};
exports.contextMenu = contextMenu;


/***/ }),

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
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const contextMenu_1 = __webpack_require__(/*! ./background/contextMenu */ "./src/background/contextMenu.ts");
function execute() {
    (0, contextMenu_1.contextMenu)();
    // setTimeout(execute, 1000 * 20);
}
execute();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CLGdCQUFnQixtQkFBTyxDQUFDLDREQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNaTjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2Isa0JBQWtCLG1CQUFPLENBQUMsaURBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxvQ0FBb0M7QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELFFBQVE7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCxLQUFLO0FBQ0w7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxpREFBaUQ7QUFDakQsQ0FBQzs7Ozs7Ozs7Ozs7QUM1RVk7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsUUFBUTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7VUMzQmxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCLG1CQUFPLENBQUMsaUVBQTBCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9iYWNrZ3JvdW5kL2NvbnRleHRNZW51LnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRTY3JpcHQvY2hlY2sudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvY29udGVudFNjcmlwdC9wb3BvdmVyLnRzIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jb250ZXh0TWVudSA9IHZvaWQgMDtcclxuY29uc3QgY2hlY2tfMSA9IHJlcXVpcmUoXCIuLi9jb250ZW50U2NyaXB0L2NoZWNrXCIpO1xyXG5jb25zdCBjb250ZXh0TWVudSA9ICgpID0+IHtcclxuICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xyXG4gICAgICAgICgwLCBjaGVja18xLmNoZWNrKSgpO1xyXG4gICAgfSk7XHJcbiAgICBjaHJvbWUudGFicy5vbkNyZWF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICgwLCBjaGVja18xLmNoZWNrKSgpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMuY29udGV4dE1lbnUgPSBjb250ZXh0TWVudTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5jaGVjayA9IHZvaWQgMDtcclxuY29uc3QgcG9wb3Zlcl8xID0gcmVxdWlyZShcIi4vcG9wb3ZlclwiKTtcclxuY29uc3QgY2hlY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aW5kRG93bkludGVydmFsID0gMTU7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrIHdhcyBjYWxsZWQhXCIpXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiYmVkdGltZVwiLCBcImNoZWNrRXZlcnlTZWNvbmRcIl0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrRXZlcnlTZWNvbmQsIFwiLCByZXN1bHQuY2hlY2tFdmVyeVNlY29uZClcclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLUdCXCIsIHsgaG91cjogXCIyLWRpZ2l0XCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIgfSk7XHJcbiAgICAgICAgdmFyIGJlZHRpbWUgPSByZXN1bHQuYmVkdGltZTtcclxuICAgICAgICB2YXIgY2hlY2tFdmVyeVNlY29uZCA9IHJlc3VsdC5jaGVja0V2ZXJ5U2Vjb25kO1xyXG4gICAgICAgIGlmICghYmVkdGltZSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldHRpbmcgZGVmYXVsdCBiZWR0aW1lXCIpXHJcbiAgICAgICAgICAgIGJlZHRpbWUgPSBcIjIyOjAwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibm93IFwiLCBub3cpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmVkdGltZTogXCIsIGJlZHRpbWUpO1xyXG4gICAgICAgIGlmIChiZWR0aW1lKSB7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGV2ZXJ5IHRpbWUgYSBwZXJjZW50YWdlIG9mIG9wYWNpdHkgZ29lcyBkb3duXHJcbiAgICAgICAgICAgIGlmIChjaGVja0V2ZXJ5U2Vjb25kICE9ICh3aW5kRG93bkludGVydmFsICogNjAgKiAxMDAwKSAvIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0V2ZXJ5U2Vjb25kOiAod2luZERvd25JbnRlcnZhbCAqIDYwICogMTAwMCkgLyAxMDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBbYmVkdGltZUhvdXJzLCBiZWR0aW1lTWludXRlc10gPSBiZWR0aW1lLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICAgICAgY29uc3QgW25vd0hvdXJzLCBub3dNaW51dGVzXSA9IG5vdy5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29tcGFyaW5nIG5vdzogXCIsIG5vd0hvdXJzLCBub3dNaW51dGVzLCBcIiB0byBiZWR0aW1lOiBcIiwgYmVkdGltZUhvdXJzLCBiZWR0aW1lTWludXRlcyk7XHJcbiAgICAgICAgICAgIGlmIChub3dIb3VycyA+PSBiZWR0aW1lSG91cnMgJiYgbm93TWludXRlcyA+PSBiZWR0aW1lTWludXRlcykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJJVCBJUyBUSU1FXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRvdGFsIHRpbWUgZWxhcHNlZFxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBob3Vyc0VsYXBzZWQgPSBwYXJzZUludChub3dIb3VycykgLSBwYXJzZUludChiZWR0aW1lSG91cnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pbnV0ZXNFbGFwc2VkID0gcGFyc2VJbnQobm93TWludXRlcykgLSBwYXJzZUludChiZWR0aW1lTWludXRlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaG91cnNFbGFwc2VkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVFbGFwc2VkICs9IGhvdXJzRWxhcHNlZCAqIDYwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXNFbGFwc2VkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVFbGFwc2VkICs9IG1pbnV0ZXNFbGFwc2VkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3BvdmVyIHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kb3duLXBvcG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wb3ZlciA9ICgwLCBwb3BvdmVyXzEuZ2V0UG9wb3ZlcikodGltZUVsYXBzZWQsIHdpbmREb3duSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wb3Zlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BhY2l0eSA9IHRpbWVFbGFwc2VkIC8gd2luZERvd25JbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2IoMCwwLDAsICR7b3BhY2l0eX0pYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrRXZlcnlTZWNvbmQgIT0gNjAwMDApIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tFdmVyeVNlY29uZDogNjAwMDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGV4cG9ydHMuY2hlY2ssIGNoZWNrRXZlcnlTZWNvbmQpOyAvLyBjaGVjayB0aGUgYmVkdGltZVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcclxuLy8gY29uc29sZS5sb2coXCJoaVwiKVxyXG4vLyBkZWZhdWx0IGNoZWNrIGV2ZXJ5IG1pbnV0ZVxyXG5jaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJjaGVja0V2ZXJ5U2Vjb25kXCIsIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwidGhpcyB3YXMgY2FsbGVkIVwiLCByZXN1bHQuY2hlY2tFdmVyeVNlY29uZClcclxuICAgIHZhciBjaGVja0V2ZXJ5U2Vjb25kID0gcmVzdWx0LmNoZWNrRXZlcnlTZWNvbmQ7XHJcbiAgICBpZiAoIWNoZWNrRXZlcnlTZWNvbmQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNldHRpbmcgZGVmYXVsdCBjaGVjayBldmVyeSBzZWNvbmRcIilcclxuICAgICAgICBjaGVja0V2ZXJ5U2Vjb25kID0gNjAwMDA7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAgICAgY2hlY2tFdmVyeVNlY29uZDogNjAwMDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KGV4cG9ydHMuY2hlY2ssIGNoZWNrRXZlcnlTZWNvbmQpOyAvLyBjaGVjayB0aGUgYmVkdGltZVxyXG59KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRQb3BvdmVyID0gdm9pZCAwO1xyXG5jb25zdCBnZXRQb3BvdmVyID0gKHRpbWVFbGFwc2VkLCB3aW5kRG93bkludGVydmFsKSA9PiB7XHJcbiAgICB2YXIgb3BhY2l0eSA9IHRpbWVFbGFwc2VkIC8gd2luZERvd25JbnRlcnZhbDtcclxuICAgIGNvbnNvbGUubG9nKFwicG9wb3ZlciB3YXMgY2FsbGVkIVwiKTtcclxuICAgIC8vIFBvcG92ZXIgZWxlbWVudFxyXG4gICAgY29uc3QgcG9wb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwb3BvdmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG4gICAgcG9wb3Zlci5zdHlsZS56SW5kZXggPSBcIjEwMDAwMDAwXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2IoMCwwLDAsICR7b3BhY2l0eX0pYDtcclxuICAgIHBvcG92ZXIuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLnJpZ2h0ID0gXCIwXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgcG9wb3Zlci5zdHlsZS5mb250RmFtaWx5ID0gXCJWZXJkYW5hLHNhbnMtc2VyaWZcIjtcclxuICAgIHBvcG92ZXIuc3R5bGUuY29sb3IgPSBcInJnYigyMTAsIDIxNCwgMjE4KVwiO1xyXG4gICAgcG9wb3Zlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG4gICAgcG9wb3Zlci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcbiAgICBwb3BvdmVyLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIC8vICAgYWxsb3dlZCB0byBjbGljayB0aHJvdWdoP1xyXG4gICAgcG9wb3Zlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gICAgLy8gc3RhbmRhcmRpemUgZm9udHNcclxuICAgIHBvcG92ZXIuaWQgPSBcIndpbmQtZG93bi1wb3BvdmVyXCI7XHJcbiAgICByZXR1cm4gcG9wb3ZlcjtcclxufTtcclxuZXhwb3J0cy5nZXRQb3BvdmVyID0gZ2V0UG9wb3ZlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnRleHRNZW51XzEgPSByZXF1aXJlKFwiLi9iYWNrZ3JvdW5kL2NvbnRleHRNZW51XCIpO1xyXG5mdW5jdGlvbiBleGVjdXRlKCkge1xyXG4gICAgKDAsIGNvbnRleHRNZW51XzEuY29udGV4dE1lbnUpKCk7XHJcbiAgICAvLyBzZXRUaW1lb3V0KGV4ZWN1dGUsIDEwMDAgKiAyMCk7XHJcbn1cclxuZXhlY3V0ZSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=