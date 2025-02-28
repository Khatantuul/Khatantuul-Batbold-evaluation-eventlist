console.log("hey");

//mvc
//single Event structure
class Event {
  constructor(id, title, startDate, endDate) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  getStartDate() {
    return this.startDate;
  }
  setStartDate(newStartDate) {
    this.startDate = newStartDate;
  }
  getEndDate() {
    return this.endDate;
  }
  setEndDate(newEndDate) {
    this.endDate = newEndDate;
  }
}


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
    
    const some = this.#events.find((event) => event.id === id);
    return some;
    
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
  async postNewEvent(newEvt) {
    try {
      const resp = await fetch(this.#apiURL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newEvt),
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
    this.addNewEventBtn = document.querySelector(".event-list__add-event-btn");
    this.eventTitleInput = document.querySelector(".event-list__item-title");
    this.eventStartDateInput = document.querySelector(
      ".event-list__item-start"
    );
    this.eventEndDateInput = document.querySelector(".event-list__item-end");
    this.eventItemEditBtn = document.querySelector(
      ".event-list__item-edit-btn"
    );
    this.eventItemDltBtn = document.querySelector(".event-list__item-dlt-btn");
    this.eventListTableBody = document.querySelector(".event-list__table-body");
  }

  renderEvents(events) {
    events.forEach((evt) => {
        this.renderEventView(evt);
    });
}

  renderEventView({ id, title, startDate, endDate }) {

    const row = this.eventListTableBody.insertRow();
    row.dataset.eventId = id;
    row.insertCell().innerHTML = `<input type="text" class="event-list__item-title" value="${title}"  readonly />`;
    row.insertCell().innerHTML = `<input type="date" class="event-list__item-start" value="${startDate}" readonly/>`;
    row.insertCell().innerHTML = `<input type="date" class="event-list__item-end" value="${endDate}" readonly/>`;
    row.classList.add("event-list__item-btns-wrapper")
    row.insertCell().innerHTML = `
            <button aria-label="Edit" class="event-list__item-edit-btn"> 
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
            </button>
            <button aria-label="Delete" class="event-list__item-dlt-btn">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
            </button>
            `;
  }
  addNewEventView() {
    const row = this.eventListTableBody.insertRow();
    // row.dataset.eventId = id;
    row.insertCell().innerHTML = `<input type="text" class="event-list__item-title" value="" required/>`;
    row.insertCell().innerHTML = `<input type="date" class="event-list__item-start" value="" required/>`;
    row.insertCell().innerHTML = `<input type="date" class="event-list__item-end" value="" required/>`;
    row.classList.add("event-list__item-btns-wrapper")
    row.insertCell().innerHTML = `
            <button aria-label="Save" class="event-list__item-save-btn"> 
               <svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button aria-label="Cancel" class="event-list__item-cancel-btn">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>
            </button>
            `;
    return row;
  }
  updateEventRowView(row, event) {
    console.log(event);
    
    const inputs = row.querySelectorAll("input");
    inputs[0].value = event.eventName || event.title;
    inputs[1].value = event.startDate;
    inputs[2].value = event.endDate;
    inputs.forEach(input => input.setAttribute("readOnly", true));
    const btnsCell = row.cells[row.cells.length - 1];
    // console.log(btnsCell);
    
    btnsCell.innerHTML = `
        <button aria-label="Edit" class="event-list__item-edit-btn"> 
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
        </button>
        <button aria-label="Delete" class="event-list__item-dlt-btn">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
        </button>
    `;
}

removeEventRowView(row){
    this.eventListTableBody.removeChild(row)
}

enableEditRowView(row) {
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.removeAttribute("readOnly"));
    const btnsCell = row.cells[row.cells.length - 1];
    btnsCell.innerHTML = `
            <button aria-label="Save" class="event-list__item-save-btn"> 
               <svg focusable viewBox="0 0 24 24" aria-hidden="true xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button aria-label="Cancel" class="event-list__item-cancel-btn">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>
            </button>
            `;
}




}

//Event Controller
class EventController {
  constructor(model, view, service) {
    this.model = model;
    this.view = view;
    this.service = service;
    this.editingEventId = null;
    this.init();
  }

  async init() {
    console.log(await this.service.fetchEvents());
    const events = await this.service.fetchEvents();

    let eventsList = [];
    eventsList = events.map(
      ({ id, eventName, startDate, endDate }) => new Event(id, eventName, startDate, endDate)
    );
    
    this.model.events = eventsList;
    this.view.renderEvents(eventsList);


    this.setUpAddNewEventHandler()
    this.setUpDeleteEventHandler();
    this.setUpEditEventHandler();
    this.setUpCancelEventHandler();
    this.setUpSaveEditEventHandler();
 
  }

  setUpAddNewEventHandler() {
    this.view.addNewEventBtn.addEventListener("click", async (e) => {
        const newRow = this.view.addNewEventView(); 
    });

    this.view.eventListTableBody.addEventListener("click", async (e) => {
        if(this.editingEventId ) return;
    
        const saveBtn = e.target.closest(".event-list__item-save-btn"); 
        if (!saveBtn) return;


        const newRow = saveBtn.closest("tr"); 
        const eventName = newRow.querySelector(".event-list__item-title").value;
        const startDate = newRow.querySelector(".event-list__item-start").value;
        const endDate = newRow.querySelector(".event-list__item-end").value;
        if(!eventName || !startDate || !endDate){
            alert("All fields are required!");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert("End date should be after the start date!");
            return;
        }
        const newEvent = await this.service.postNewEvent({ eventName, startDate, endDate });
        this.view.updateEventRowView(newRow, newEvent);
    });
}

setUpDeleteEventHandler(){
    this.view.eventListTableBody.addEventListener("click", async (e) => {
        const dltBtn = e.target.closest(".event-list__item-dlt-btn"); 
        if (!dltBtn) return;

        const rowToDelete = dltBtn.parentElement.parentElement;
        const eventId = rowToDelete.dataset.eventId;
        this.service.deleteEvent(eventId);
        this.model.deleteEvent(eventId);
        this.view.removeEventRowView(rowToDelete);

    });
}
setUpCancelEventHandler(){
    this.view.eventListTableBody.addEventListener("click", async (e) => {
        const cancelBtn = e.target.closest(".event-list__item-cancel-btn"); 
        if (!cancelBtn) return;

        const rowToCancel = cancelBtn.parentElement.parentElement;
        const eventId = rowToCancel.dataset.eventId;
        
        if(!eventId){
            //should indicate new row pre-post request
            rowToCancel.remove();
        }else{
            //cancel our editing on existing event
            const oldEvent = this.model.getEventById(eventId);
            this.view.updateEventRowView(rowToCancel,oldEvent)
        }

    });
}

setUpEditEventHandler(){
    this.view.eventListTableBody.addEventListener("click", async (e) => {
        const editBtn = e.target.closest(".event-list__item-edit-btn"); 
        if (!editBtn) return;
    
        const rowToEdit = editBtn.parentElement.parentElement;
        this.view.enableEditRowView(rowToEdit);
        this.editingEventId = rowToEdit.dataset.eventId;
    });
}

setUpSaveEditEventHandler(){
    this.view.eventListTableBody.addEventListener("click", async (e) => {
        if (!this.editingEventId) return; 
        const saveBtn = e.target.closest(".event-list__item-save-btn"); 
        if (!saveBtn) return;

        const rowToEdit = saveBtn.closest("tr");
        const eventName = rowToEdit.querySelector(".event-list__item-title").value;
        const startDate = rowToEdit.querySelector(".event-list__item-start").value;
        const endDate = rowToEdit.querySelector(".event-list__item-end").value;
        if(!eventName || !startDate || !endDate){
            alert("All fields are required!");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert("End date should be after the start date!");
            return;
        }
        const updatedEvent = {
            id: this.editingEventId,
            eventName,
            startDate,
            endDate
        };

            await this.service.updateEvent(this.editingEventId, updatedEvent);
            this.model.editEvent(updatedEvent);
            this.view.updateEventRowView(rowToEdit, updatedEvent);
            this.editingEventId = null;    
    
    });
}

}

const model = new EventModel();
const view = new EventView();
const service = new EventService();
const controller = new EventController(model, view, service);
