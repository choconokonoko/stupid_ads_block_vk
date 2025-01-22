const initial = {
  remove_official: false,
  remove_unofficial: true,
}

let state = initial

function saveState(state) {
  chrome.storage.local.set(state)
}

function runScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    })
  })
}

chrome.storage.local.get((data) => {
  if (typeof data === 'object'
    && 'remove_official' in data
    && 'remove_unofficial' in data
  ) {
    state = data
  }

  const switch_1 = document.getElementById('remove_unofficial')
  const switch_2 = document.getElementById('remove_official')

  if (switch_1 && switch_2) {
    switch_1.checked = state.remove_unofficial
    switch_2.checked = state.remove_official

    saveState(state)
    runScript()

    switch_1.addEventListener('change', (e) => {
      state.remove_unofficial = e.target.checked
      saveState(state)
      runScript()
    })
    switch_2.addEventListener('change', (e) => {
      state.remove_official = e.target.checked
      saveState(state)
      runScript()
    })
  }
})
