const API_BASE = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔥 MEDIA
export const getMedia = async () => {
  try {
    const response = await fetch(`${API_BASE}/media`);
    if (!response.ok) throw new Error('Failed to fetch media');
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
};

export const saveMedia = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save media');
    return await response.json();
  } catch (error) {
    console.error('Error saving media:', error);
    throw error;
  }
};

export const updateMedia = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE}/media/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update media');
    return await response.json();
  } catch (error) {
    console.error('Error updating media:', error);
    throw error;
  }
};

export const deleteMedia = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete media');
    return await response.json();
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

// 🔥 MEMBERS
export const getMembers = async () => {
  try {
    const response = await fetch(`${API_BASE}/members`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
};

export const saveMembers = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save members');
    return await response.json();
  } catch (error) {
    console.error('Error saving members:', error);
    throw error;
  }
};

export const updateMembers = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update members');
    return await response.json();
  } catch (error) {
    console.error('Error updating members:', error);
    throw error;
  }
};

export const deleteMembers = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/members/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Failed to delete members');
    return await response.json();
  } catch (error) {
    console.error('Error deleting members:', error);
    throw error;
  }
};