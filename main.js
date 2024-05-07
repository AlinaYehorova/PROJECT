import { eventsStore } from "./js/data.js";
import { createDomElement } from "./js/utils.js";
import { formatDate } from "./js/utils.js";

const allEventsDiv = document.querySelector(".events__all-events");
const eventTypeSelect = document.getElementById("event-type");
const eventDistanceSelect = document.getElementById("event-distance");
const eventCategorySelect = document.getElementById("event-category");

function createEvent(arr) {
  arr.forEach((eventElement) => {
    const link = createDomElement({ tag: "a", className: "events__all-events-link", href: "#" });
    allEventsDiv.append(link);
    const eventImageContainer = createDomElement({ tag: "div", className: "events__all-events-image-container" });
    link.append(eventImageContainer);
    const eventImage = createDomElement({ tag: "img", className: "events__all-events-image", src: eventElement.image });
    eventImageContainer.append(eventImage);
    const eventsDescription = createDomElement({ tag: "div", className: "events__all-events-description" });
    link.append(eventsDescription);
    const eventsDate = createDomElement({ tag: "p", className: "events__all-events-date", textValue: formatDate(eventElement.date) });
    const eventsHeader = createDomElement({ tag: "h3", className: "events__all-events-header", textValue: eventElement.title });
    const eventsCategory = createDomElement({ tag: "p", className: "events__all-events-category", textValue: eventElement.category });
    eventsDescription.append(eventsDate, eventsHeader, eventsCategory);
    if (eventElement.type === "online") {
      const onlineEventImage = createDomElement({
        tag: "img",
        className: "events__all-events-online-event-image",
        src: "./images/Online Event.svg",
        alt: "online event",
      });
      eventsDescription.append(onlineEventImage);
    }
    if (eventElement.attendees) {
      const eventsAtendees = createDomElement({
        tag: "p",
        className: "events__all-events-atendees",
        textValue: `${eventElement.attendees} attendees`,
      });
      eventsDescription.append(eventsAtendees);
    }
  });
}
function clearEvents() {
  while (allEventsDiv.firstChild) {
    allEventsDiv.removeChild(allEventsDiv.firstChild);
  }
}
function filterEvents(arr) {
  const selectedType = eventTypeSelect.value === "any" ? undefined : eventTypeSelect.value;
  const selectedDistance = eventDistanceSelect.value === "any" ? undefined : eventDistanceSelect.value;
  const selectedCategory = eventCategorySelect.value === "any" ? undefined : eventCategorySelect.value;
  let filteredArr = arr;
  if (selectedType) {
    filteredArr = filteredArr.filter((element) => element.type === selectedType);
  }
  if (selectedDistance) {
    filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance);
  }
  if (selectedCategory) {
    filteredArr = filteredArr.filter((element) => element.category === selectedCategory);
  }
  clearEvents();
  createEvent(filteredArr);
}
eventTypeSelect.addEventListener("change", () => {filterEvents(eventsStore)});
eventDistanceSelect.addEventListener("change", () => {filterEvents(eventsStore)});
eventCategorySelect.addEventListener("change", () => {filterEvents(eventsStore)});
createEvent(eventsStore);