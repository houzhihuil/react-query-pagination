import React  from 'react';  
import FilterableListAvecPagination from './FilterableListAvecPagination' 
import {  QueryClient, QueryClientProvider } from 'react-query';  

function Index() {
  const queryClient = new QueryClient();  
  // Render the filtered and paginated data

  return (
    <div>
        <QueryClientProvider client={queryClient}>
          <FilterableListAvecPagination />
        </QueryClientProvider> 
    </div>
  );
}

export default Index;
