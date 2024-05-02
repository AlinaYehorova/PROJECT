export const createEventElement = (data) => {
    const element = document.createElement('div')
    element.textContent = data.title
    return element
  }
  
  export const eventsBox = document.querySelector('.events')
  
  export const renderEvents = (arr) => {
    eventsBox.innerHTML = ''
    arr.forEach((eventData) => {
      const element = createEventElement(eventData)
      eventsBox.append(element)
    })
  }