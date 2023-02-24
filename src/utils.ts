export async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true  };
  const [tab] = await chrome.tabs.query(queryOptions);
  console.log("here2")
  return tab;
}

export async function sendMessageInCurrentTab(
  message: any,
  callback?: ((response: any) => void) | undefined
) {
  const tab = await getCurrentTab();
  console.log("well this is the tab: ", tab)
  if (!tab.id) return;
  console.log("here1")
  return sendMessageInTab(tab.id, message, callback);
}

async function sendMessageInTab(
  tabId: number,
  message: any,
  callback?: ((response: any) => void) | undefined
) {
  console.log("here3")
  chrome.tabs.sendMessage(tabId, message, callback);
}
