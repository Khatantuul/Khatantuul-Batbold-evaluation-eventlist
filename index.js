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

  //service layer
class EventService {
    #apiURL;
    constructor() {
      this.#apiURL = "http://localhost:3000/events";
    }
  
    //get
    async fetchEvents() {
      try {
        const resp = await fetch(this.#apiURL);
        const events = await resp.json();
        return events;
      } catch (err) {
        console.log("Error when fetching events", err);
      }
    }
    //post
    async postNewEvent(newEvent) {
      try {
        const resp = await fetch(this.#apiURL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newEvent),
        });
        const newEvent = resp.json();
        return newEvent;
      } catch (err) {
        console.log("Error when posting new event", err);
      }
    }
    //put
    async updateEvent(id, updatedEvent) {
      try {
        await fetch(`${this.#apiURL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        });
      } catch (err) {
        console.log("Error when updating event", err);
      }
    }
    //delete
    async deleteEvent(id) {
      console.log(id);
  
      try {
        await fetch(`${this.#apiURL}/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.log("Error when deleting an event", err);
      }
    }
  }

  //Event View
class EventView {
    constructor() {
      this.addNewEventBtn = document.querySelector('.event-list__add-event-btn');
      this.eventTitleInput = document.querySelector(".event-list__item-title");
      this.eventStartDateInput = document.querySelector(".event-list__item-start");
      this.eventEndDateInput = document.querySelector(".event-list__item-end");
      this.eventItemEditBtn = document.querySelector('.event-list__item-edit-btn');
      this.eventItemDltBtn = document.querySelector('.event-list__item-dlt-btn')
    }
  
  }




  
  const model = new EventModel();
  const view = new EventView();
//   const