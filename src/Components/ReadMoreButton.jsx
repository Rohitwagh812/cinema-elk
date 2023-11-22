import { Button } from 'react-bootstrap';
import React from 'react'
import { useState } from 'react';

 const ReadMoreButton = ({ text , maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleReadMore = () => {
      setIsExpanded(!isExpanded);
    }; 
  
    return (
      <div>
        {isExpanded ? (
          <div>
           <div>
             {text}
           </div>
            <Button style={{marginTop:30}} onClick={ toggleReadMore }>Read Less</Button>
          </div>
        ) : (
          <div>
            <div>
              {text.slice(0, maxLength)}
              {text.length > maxLength && '... '}
            </div>
             <Button style={{marginTop:10}} onClick={ toggleReadMore }>Read More</Button>
          </div>
        )}
      </div>
    );
  };

  export default ReadMoreButton
