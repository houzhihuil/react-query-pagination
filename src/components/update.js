import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Update() { 
  const { my_id } = useParams(); 
  const navigate = useNavigate();  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
        // Fetch data from API
        axios.get(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${my_id}`)
          .then(response => {
            const data = response.data; // Assuming the API response contains firstName, lastName, and checkbox fields
    
            // Update the component's state with the fetched data
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setCheckbox(data.checkbox);
          })
          .catch(error => {
            // Handle error here
            console.error('Error fetching data:', error);
          });
      }, [my_id]); // Add my_id as a dependency to re-fetch data when it changes  
       

    const updateAPIData = () => { 
      axios
        .put(`https://64e7bf5db0fd9648b7904d83.mockapi.io/fakeData/${my_id}`, {
          firstName,
          lastName,
          checkbox
        })
        .then(() => { 
          // Navigate back to the "Read" page
          navigate('/'); 
        })
        .catch(error => {
          // Handle error here
          console.error('Error updating data:', error);
        });
    };
  
    return (
      <div>
        <Form className="create-form">
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
          </Form.Field>
  
          <Button onClick={updateAPIData}>Update</Button>
          <Link to='/'> <Button>Cancel</Button> </Link> 
        </Form>
      </div>
    );
  }
  
 
