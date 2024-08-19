import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const categories = [
  "Corporate",
  "Wedding",
  "Product Launch",
  "Social Gathering",
];

export default function EventModal({ event, onClose, onSave, fetchEvents }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    client: '',
    date: '',
    gallery: [],
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load event data for editing
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || '',
        client: event.client || '',
        location : event.location || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        gallery: event.gallery || [],
      });

      setSelectedImages(event.gallery.map(image => ({
        ...image,
        file: null,
        preview: image.src,
      })));
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (images) => {
    setSelectedImages(prev => [...prev, ...images]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetMainImage = (index) => {
    const newGallery = selectedImages.map((img, i) => ({
      ...img,
      type: i === index ? 'main' : 'normal',
    }));
    setSelectedImages(newGallery);
  };

  const validateForm = () => {
    if (!formData.title.trim()) return { valid: false, message: "Title is required" };
    if (!formData.description.trim()) return { valid: false, message: "Description is required" };
    if (!formData.type) return { valid: false, message: "Event type is required" };
    if (!formData.client.trim()) return { valid: false, message: "Client is required" };
    if (!formData.date) return { valid: false, message: "Date is required" };
    if (selectedImages.length === 0) return { valid: false, message: "At least one image is required" };
    return { valid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validation = validateForm();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
  
    setLoading(true);
  
    try {
      const newImages = selectedImages.filter(img => img.file);
      const existingImages = selectedImages.filter(img => !img.file);
  
      // Upload new images to Cloudinary
      const uploadFormData = new FormData();
      newImages.forEach(img => uploadFormData.append('file', img.file));
  
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData
      });
  
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.message || 'Failed to upload images');
      }
  
      const uploadedImages = await uploadRes.json();
  
      // Delete removed images from Cloudinary
      if (event) {
        const removedImages = formData.gallery.filter(originalImg => 
          !selectedImages.find(img => img._id === originalImg._id)
        );
        
        for (const img of removedImages) {
          const deleteRes = await fetch('/api/deleteImage', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: img.public_id })
          });
  
          if (!deleteRes.ok) {
            const errorData = await deleteRes.json();
            console.error(`Failed to delete image ${img.public_id}:`, errorData.message);
            // Consider how you want to handle this error. You might want to continue
            // with the submission or abort the whole process.
          }
        }
      }
  
      const updatedGallery = [
        ...existingImages.map(img => ({
          _id: img._id,
          title: img.title || '',
          src: img.src,
          type: img.type || 'normal',
          public_id: img.public_id
        })),
        ...uploadedImages.map((img, index) => ({
          title: '',
          src: img.src,
          type: newImages[index].type || 'normal',
          public_id: img._id // Store _id as public_id
        })),
      ];
  
      const updatedFormData = {
        ...formData,
        gallery: updatedGallery,
      };
  
      const method = event ? 'PATCH' : 'POST';
      const url = event ? `/api/admin/events?id=${event._id}` : '/api/admin/events';
  
      const eventRes = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!eventRes.ok) {
        const errorData = await eventRes.json();
        throw new Error(errorData.message || 'Error saving event');
      }
  
      const savedEvent = await eventRes.json();
      // onSave(savedEvent);
      onClose();
      fetchEvents()
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
  <div className="relative top-10 mx-auto p-6 border w-full max-w-4xl bg-white shadow-lg rounded-md mt-10 z-[60] ">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">{event ? 'Edit Event' : 'Add New Event'}</h3>
      <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-xl"><FontAwesomeIcon icon={faX} /></button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="client">Client</label>
          <input
            id="client"
            name="client"
            type="text"
            value={formData.client}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Images</label>
        <ImageUpload setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.src} alt={`preview-${index}`} className="w-full h-40 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
              <button
                type="button"
                onClick={() => handleSetMainImage(index)}
                className={`absolute bottom-0 right-0 ${image.type === 'main' ? 'bg-green-500' : 'bg-gray-500'} text-white rounded-lg text-xs flex items-center justify-center px-2 py-1`}
              >
                Set Main Image
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
