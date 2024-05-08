import { eventsStore } from "./js/data.js";
import { createDomElement } from "./js/utils.js";
import { formatDate } from "./js/utils.js";

const allEvents = document.querySelector(".events__filtred-events")
const eventTypeSelect = document.getElementById("event-type")
const eventDistanceSelect = document.getElementById("event-distance")
const eventCategorySelect = document.getElementById("event-category")

function createEvent(arr) {
  arr.forEach((eventElement) => {
    const eventsLink = createDomElement({ tag: "a", className: "events__events-link", href: "#" })
    allEvents.append(eventsLink)
    const eventsImages = createDomElement({ tag: "div", className: "events__events-images" })
    eventsLink.append(eventsImages)
    const eventImage = createDomElement({ tag: "img", className: "events__events-image", src: eventElement.image })
    eventsImages.append(eventImage)
    const eventsDescription = createDomElement({ tag: "div", className: "events__events-description" })
    eventsLink.append(eventsDescription)
    const eventsDate = createDomElement({ tag: "p", className: "events__events-date", textValue: formatDate(eventElement.date) })
    const eventsTitle = createDomElement({ tag: "h3", className: "events__events-title", textValue: eventElement.title })
    const eventsCategory = createDomElement({ tag: "p", className: "events__events-category", textValue: eventElement.category })
    eventsDescription.append(eventsDate, eventsTitle, eventsCategory);
    if (eventElement.type === "online") {
      const onlineEventImage = createDomElement({
        tag: "img",
        className: "events__events-online-event-image",
        src: "./images/online-event.svg",
        alt: "online event",
      })
      eventsDescription.append(onlineEventImage)
    }
    if (eventElement.attendees) {
      const eventsAtendees = createDomElement({
        tag: "p",
        className: "events__events-atendees",
        textValue: `${eventElement.attendees} attendees`,
      })
      eventsDescription.append(eventsAtendees)
    }
  })
}
function clearEvents() {
  while (allEvents.firstChild) {
    allEvents.removeChild(allEvents.firstChild);
  }
}
function filterEvents(arr) {
  const selectedType = eventTypeSelect.value === "any" ? undefined : eventTypeSelect.value
  const selectedDistance = eventDistanceSelect.value === "any" ? undefined : eventDistanceSelect.value
  const selectedCategory = eventCategorySelect.value === "any" ? undefined : eventCategorySelect.value
  let filteredArr = arr
  if (selectedType) {
    filteredArr = filteredArr.filter((element) => element.type === selectedType)
  }
  if (selectedDistance) {
    filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance)
  }
  if (selectedCategory) {
    filteredArr = filteredArr.filter((element) => element.category === selectedCategory)
  }
  clearEvents()
  createEvent(filteredArr)
}
eventTypeSelect.addEventListener("change", () => {filterEvents(eventsStore)})
eventDistanceSelect.addEventListener("change", () => {filterEvents(eventsStore)})
eventCategorySelect.addEventListener("change", () => {filterEvents(eventsStore)})
createEvent(eventsStore)