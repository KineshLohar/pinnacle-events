'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../_components/Admin/AdminLayout';
import EventList from '../../_components/Admin/EventList';
import EventModal from '../../_components/Admin/EventModal';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const res = await fetch('/api/events');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("data from eveents", data);
      
      setEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsLoading(true);
      setError(null);
  
      try {
        const deleteRes = await fetch(`/api/admin/events?id=${eventId}`, {
          method: 'DELETE',
        });
  
        if (!deleteRes.ok) {
          const errorData = await deleteRes.json();
          throw new Error(errorData.message || 'Failed to delete event');
        }
  
        const result = await deleteRes.json();
  
        if (result.success) {
          // If successful, refetch the events
          await fetchEvents();
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (err) {
        console.error("Error deleting event:", err);
        setError(err.message || "Failed to delete event. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    // fetchEvents();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4 mt-24">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add New Event
        </button>
      </div>
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <EventModal event={selectedEvent} onClose={handleModalClose} fetchEvents={fetchEvents} />
      )}
    </AdminLayout>
  );
}