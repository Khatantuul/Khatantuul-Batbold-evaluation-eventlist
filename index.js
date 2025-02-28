console.log('hey');

//mvc
//single Event structure
class Event{
    constructor(title, startDate, endDate){
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getTitle(){
        return this.title;
    }
    setTitle(newTitle){
        this.title = newTitle;
    }
    getStartDate(){
        return this.startDate;
    }
    setStartDate(newStartDate){
        this.startDate = newStartDate;
    }
    getEndDate(){
        return this.endDate;
    }
    setEndDate(newEndDate){
        this.endDate = newEndDate;
    }
}

// const row = document.querySelector('.event-list__item');
// row.addEventListener('change', (e)=>{
//     console.log(e.target.value);
    
// })



// const newEvent = new Event("Concert", "2025-02-20", "2025-02-23")
// console.log(newEvent);

//Event Model
class EventModel {
    #events;
    constructor() {
      this.#events = [];
    }
  
    //get events
    get events() {
      return this.#events;
    }
    //set events after fetching all when first load
    set events(events) {
      this.#events = events;
    }

    getEventById(id) {
      return this.#events.find((event) => event.id === id);
    }
    //add event
    addEvent(newEvent) {
      this.#events.push(newEvent);
    }
    //edit event
    editEvent({ id, newTitle, newStartDate, newEndDate }) {
      const itemToUpdate = this.getEventById(id);
      if (itemToUpdate) {
        itemToUpdate.title = newTitle;
        itemToUpdate.startDate = newStartDate;
        itemToUpdate.endDate = newEndDate;
        return true;
      }
      return false;
    }
    //delete event
    deleteEvent(id) {
      this.#events = this.#events.filter((event) => event.id !== id);
    }
  }