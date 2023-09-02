import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Table, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
   

function FilterableListAvecPagination() {
  const navigate = useNavigate();
  
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  // Fetch data using React-Query
  const { data, isLoading, error } = useQuery(['items', currentPage], fetchItems);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Simulated API fetch function
  async function fetchItems(queryKey) {
    const page = queryKey[1]; // Current page from query key
    const response = await fetch(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData?page=${page}`);
    const data = await response.json();
    return data;
  }

  // Calculate pageCount based on the total number of items
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Paginate the data
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Filtered data based on filterText
  const filteredData = paginatedData.filter(item =>
    item.firstName.toLowerCase().includes(filterText.toLowerCase())
  );
 
  const onDelete = (id) => {
    
    axios.delete(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${id}`)
    .then(() => { 
      // Navigate back to the "Index" page
      navigate('/'); 
    }); 
} 

  // Render the filtered and paginated data

  return (
    <div> 
      <Link to='/create'><Button>Create</Button><br />
      </Link>
  
 
      {/* Filtering input */}
      <input
        type="text"
        placeholder="Filter by first name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
        <Table singleLine>
              <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
      {/* Display filtered data */}
       
        {filteredData.map(item => (
          <Table.Row key={item.id}>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.firstName}</Table.Cell>
          <Table.Cell>{item.lastName}</Table.Cell>
          <Table.Cell>{item.checkbox}</Table.Cell> 
          <Table.Cell> 
              <Link to={ `/update/${item.id}`}> 
                <Button  variant="info">Update</Button>
              </Link>  
          </Table.Cell>
          <Table.Cell>   
              <Button onClick={() => onDelete(item.id)}>Delete</Button> 
          </Table.Cell>  
      </Table.Row> 
        ))}
        </Table.Body> 
      </Table>
      {/* Pagination controls */}
            <div className="pagination">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={currentPage === index ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
    </div>
  );
}

export default FilterableListAvecPagination;
