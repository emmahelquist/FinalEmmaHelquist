// EntertainerAPI.ts (or wherever your API calls are defined)

import { Entertainer, EntertainerAddRequest } from '../../types/entertainer'; // Adjust the path

const API_URL = 'http://localhost:5142/api/entertainer'; // Replace with your actual API URL

// Add
export const addEntertainer = async (
  newEntertainer: EntertainerAddRequest
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error(`Failed to add entertainer. Status: ${response.status}`);
    }

    // You can adjust this part based on what your backend returns
    return await response.json(); // Or response.text(), etc.
  } catch (error) {
    console.error('Error adding entertainer:', error);
    throw error;
  }
};

export const getEntertainerById = async (id: number): Promise<Entertainer> => {
  // Return Entertainer
  try {
    const response = await fetch(
      `<span class="math-inline">\{API\_URL\}/</span>{id}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch entertainer. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainer:', error);
    throw error;
  }
};

// Edit
export const updateEntertainer = async (
  id: number,
  entertainer: EntertainerAddRequest
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/UpdateEntertainer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entertainer),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update entertainer. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating entertainer:', error);
    throw error;
  }
};

// Delete
export const deleteEntertainer = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/DeleteEntertainer/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete entertainer. Status: ${response.status}`
      );
    }
    return await response.json(); // Or handle response as needed
  } catch (error) {
    console.error('Error deleting entertainer:', error);
    throw error;
  }
};
