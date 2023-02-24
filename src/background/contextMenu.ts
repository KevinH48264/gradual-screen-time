import { check } from "../contentScript/check";

export const contextMenu = () => {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    check()
  });

  chrome.tabs.onCreated.addListener(function(tab) {  
    check()
  })
};
