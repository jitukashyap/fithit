import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import ClientForm from "../blocks/ClientForm";
import DeleteDialog from "../blocks/DeleteDialog";
import AppointmentForm from "../blocks/AppointmentForm";

export default function AppointmentGrid() {
  // Navigate
  const navigate = useNavigate();

  // Read from localStorage
  const savedClients = localStorage.getItem("clients");

  // State for clients
  const [clients, setClients] = useState(
    savedClients
      ? JSON.parse(savedClients)
      : [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            location: "123 Main St",
            appointments: [],
          },
        ]
  );

  // Watch for changes to clients
  useEffect(() => {
    // Save in localStorage
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // Whether to show the form or not
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  // Show the new form
  const showNewForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      location: "",
      appointments: [],
    });

    setShowForm(true);
  };

  // Show the edit form
  const showEditForm = (item) => {
    setFormData({ ...item });

    setShowForm(true);
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    // If data has an id, we're editing
    if (data.id) {
      // Find the index of the item we're editing
      const index = clients.findIndex((item) => item.id === data.id);
      // If found
      if (index > -1) {
        // Clone the clients array
        const newClients = [...clients];
        // Update the item
        newClients[index] = data;
        // Update the clients state
        setClients(newClients);

        Store.addNotification({
          title: "Success!",
          message: "Client updated successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    }
    // Otherwise
    else {
      // Assign an id
      data.id = Date.now();
      // Add to clients
      setClients([...clients, data]);

      Store.addNotification({
        title: "Success!",
        message: "Client created successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    }

    // Hide the dialog
    setShowForm(false);
  };

  // Whether to show the form or not
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState({});
  const [selectedClientItem, setSelectedClientItem] = useState(null);

  // Show the new form
  const showNewAppointmentForm = (item) => {
    setFormData({
      date: "",
      time: "",
    });

    setSelectedClientItem(item);
    setShowAppointmentForm(true);
  };

  // Show the edit form
  const showEditAppointmentForm = (item, appointment) => {
    setAppointmentFormData({ ...appointment });

    setSelectedClientItem(item);
    setShowAppointmentForm(true);
  };

  // Handle form submission
  const handleAppointmentFormSubmit = (data) => {
    // Get the client using selectedClientItem
    const clientIndex = clients.findIndex(
      (item) => item.id === selectedClientItem.id
    );

    // If no client, return
    if (clientIndex === -1) {
      return;
    }

    // If data has an id, we're editing
    if (data.id) {
      // Find the index of the item we're editing
      const index = clients[clientIndex].appointments.findIndex(
        (item) => item.id === data.id
      );

      // If found
      if (index > -1) {
        // Clone the appointments array
        const newAppointments = [...clients[clientIndex].appointments];

        // Update the item
        newAppointments[index] = data;

        // Clone the clients array
        const newClients = [...clients];
        // Update the item
        newClients[clientIndex].appointments = newAppointments;

        // Update the clients state
        setClients(newClients);

        Store.addNotification({
          title: "Success!",
          message: "Appointment updated successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    }
    // Otherwise
    else {
      // Assign an id
      data.id = Date.now();

      // Clone the clients array
      const newClients = [...clients];
      // Update the item
      newClients[clientIndex].appointments.push(data);

      // Add to clients
      setClients(newClients);

      Store.addNotification({
        title: "Success!",
        message: "Appointment created successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    }

    // Hide the dialog
    setShowAppointmentForm(false);
  };

  // Show the delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  // Show the delete dialog
  const showDelete = (item, type) => {
    setSelectedDeleteItem({
      type,
      item,
    });
    setShowDeleteDialog(true);
  };

  // Show the delete dialog
  const showAppointmentDelete = (item, appointment) => {
    setSelectedDeleteItem({
      type: "appointment",
      item,
      appointment,
    });

    setShowDeleteDialog(true);
  };

  // Handle delete
  const handleDelete = ({ type, item, appointment = null }) => {
    // If type is a client
    if (type === "client") {
      // Find the index of the item we're editing
      const index = clients.findIndex((search) => search.id === item.id);
      // If found
      if (index > -1) {
        // Clone the clients
        const newClients = [...clients];
        // Splice the item out
        newClients.splice(index, 1);
        // Update the appointments state
        setClients(newClients);

        Store.addNotification({
          title: "Success!",
          message: "Client deleted successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    }

    // If type is an appointment
    else if (type === "appointment") {
      // Get the client using selectedClientItem
      const clientIndex = clients.findIndex((search) => search.id === item.id);

      // If no client, return
      if (clientIndex === -1) {
        return;
      }

      // Find the index of the item we're editing
      const index = clients[clientIndex].appointments.findIndex(
        (search) => search.id === appointment.id
      );

      // If found
      if (index > -1) {
        // Clone the appointments array
        const newAppointments = [...clients[clientIndex].appointments];
        // Splice the item out
        newAppointments.splice(index, 1);

        // Clone the clients array
        const newClients = [...clients];
        // Update the item
        newClients[clientIndex].appointments = newAppointments;

        // Update the clients state
        setClients(newClients);

        Store.addNotification({
          title: "Success!",
          message: "Appointment deleted successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* If we should show the form */}
      {showForm && (
        <ClientForm
          data={formData}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* If we should show the appointments form */}
      {showAppointmentForm && (
        <AppointmentForm
          data={appointmentFormData}
          onSubmit={handleAppointmentFormSubmit}
          onClose={() => setShowAppointmentForm(false)}
        />
      )}

      {/* If we should show the delete dialog */}
      {showDeleteDialog && (
        <DeleteDialog
          data={selectedDeleteItem}
          onDelete={handleDelete}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}

      {/* Show heading */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Appointments</h1>

        <div className="flex items-center">
          {/* Show a button to trigger create dialog */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-3"
            onClick={showNewForm}
          >
            + &nbsp;Add Client
          </button>

          {/* Show a button to redirect to /calendar */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/calendar")}
          >
            Calendar View
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Appointments
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through clients */}
            {clients.map((item) => (
              <tr
                key={item.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4 align-baseline">{item.firstName}</td>
                <td className="px-6 py-4 align-baseline">{item.lastName}</td>
                <td className="px-6 py-4 align-baseline">{item.location}</td>
                <td className="px-6 py-4 align-baseline">
                  {/* Loop through appointments */}
                  {item.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col lg:flex-row justify-between items-center"
                    >
                      <span className="whitespace-nowrap">
                        {appointment.date} - {appointment.time}
                      </span>

                      <div className="mb-2 lg:mb-0">
                        <span
                          className="font-medium cursor-pointer text-blue-600 hover:underline mr-2"
                          onClick={() =>
                            showEditAppointmentForm(item, appointment)
                          }
                        >
                          Edit
                        </span>

                        <span
                          className="font-medium cursor-pointer text-red-600 hover:underline"
                          onClick={() =>
                            showAppointmentDelete(item, appointment)
                          }
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  ))}

                  {item.appointments.length === 0 && "No appointments"}
                </td>
                <td className="px-6 py-4 flex flex-col lg:flex-row lg:justify-end items-end lg:items-center">
                  <span
                    className="whitespace-nowrap font-medium cursor-pointer bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 mb-3 lg:mb-0 lg:mr-4"
                    onClick={() => showNewAppointmentForm(item)}
                  >
                    + &nbsp;Appointment
                  </span>

                  <span
                    className="font-medium cursor-pointer text-blue-600 hover:underline mb-3 lg:mb-0 lg:mr-4"
                    onClick={() => showEditForm(item)}
                  >
                    Edit
                  </span>

                  <span
                    className="font-medium cursor-pointer text-red-600 hover:underline"
                    onClick={() => showDelete(item, "client")}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
