export default function EventList({ events, onEdit, onDelete }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events?.map((event) => {
          const mainImage = event.gallery?.find(item => item.type === 'main')
          return (

          <div key={event._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="mt-2">{event.description.substring(0, 100)}...</p>
            <img src={mainImage?.src} />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => onEdit(event)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
)})}
      </div>
    );
  }