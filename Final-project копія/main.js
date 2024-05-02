import { eventsStore } from "./js/data.js"
import { createEventElement, renderEvents, eventsBox } from "./js/utils.js"

renderEvents(eventsStore)

const distanceSelect = document.getElementById('distance-select')

distanceSelect.addEventListener('change', (e) => {
  const value = Number(e.target.value)
  if (Number.isNaN(value)) {
    renderEvents(eventsStore)
  } else {
    const filteredData = eventsStore.filter((event) => {
      return event.distance === value
    })
  
    if (filteredData.length === 0) {
      eventsBox.textContent = 'нет данных'
    }
    renderEvents(filteredData)
  }
})