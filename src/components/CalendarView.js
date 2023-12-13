// CalendarView.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function getAppointments(date) {
  // Read from localStorage
  const clients = JSON.parse(localStorage.getItem("clients") || []);

  // To be returned
  const onThisDay = [];

  // Get the date in string (YYYY-MM-DD) from the date object
  const dateString = date.toISOString().split("T")[0];

  // Go through each clients
  for (const client of clients) {
    // Go through each appointments
    for (const appointment of client.appointments) {
      // Check if the date matches
      if (appointment.date === dateString) {
        // Push to the appointments
        onThisDay.push({
          time: appointment.time,
          title: `${client.firstName} ${client.lastName}`,
        });
      }
    }
  }

  // Return the appointments
  return onThisDay;
}

const CalendarView = () => {
  // Get the navigate function
  const navigate = useNavigate();

  function renderCell(date) {
    const list = getAppointments(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <div>{moreCount} more</div>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Show heading */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Calendar View</h1>

        <div className="flex items-center">
          {/* Show a button to redirect to / */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Appointments
          </button>
        </div>
      </div>

      {/* Show the calendar view */}
      <div>
        <Calendar bordered renderCell={renderCell} />
      </div>
    </div>
  );
};

export default CalendarView;
