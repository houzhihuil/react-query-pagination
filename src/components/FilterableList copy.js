import React, { useState } from 'react'; 
import { useQuery } from 'react-query';

function FilterableList() { 
  const [filterText, setFilterText] = useState('');

  // Fetch data using React-Query
  const { data, isLoading, error } = useQuery('items', fetchItems);
 
  
  console.log(filterText);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtered data based on filterText
  const filteredData = data.filter(item =>
    item.firstName.toLowerCase().includes(filterText.toLowerCase())
  );
  console.log(filteredData);  
  // Simulated API fetch function
  async function fetchItems() {
    const response = await fetch('https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData');
    const data = await response.json();
    return data;
  }

  // Render the filtered data
 
  return (
    <div>
      {/* Filtering input */}
      <input
        type="text"
        placeholder="Filter by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Display filtered data */}
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.firstName} {item.lastName}</li>
        ))}
      </ul>
    </div>
  );
}


export default  FilterableList