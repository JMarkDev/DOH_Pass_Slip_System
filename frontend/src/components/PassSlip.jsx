import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'

function PassSlip() {
  const [selectedOption, setSelectedOption] = useState('');
  const [dateNow, setDateNow] = useState('');

  useEffect(() => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    function getHours() {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      };
      
      return today.toLocaleString('en-US', options);
    }
    
    const time = getHours() 
    setDateNow(date + ' ' + time);
  }, [])
  
  const handleOptionChange = (event) => { 
    setSelectedOption(event.target.value);
  };

  return (
    <>
    <Navbar />
    <div className='pass_slip'>
      <div>
        <form>
          <h1 className='title'>Permit Slip</h1>
          <p className='title__2'>(To be prepared In duplicate Org. SG Dup. HRMP)</p>
          <div className='date'>
            <div className='details'>
              <label htmlFor=''>First Name</label>
              <input type='text'  placeholder='enter first name'/>
            </div>
            <div className='details'>
              <label htmlFor=''>Middle Name</label>
              <input type='text'  placeholder='enter middle name'/>
            </div>
            <div className='details'>
              <label htmlFor=''>Last Name</label>
              <input type='text' placeholder='enter last name'/>
            </div>
            <div className='details'>
              <label htmlFor=''>Position</label>
              <input type='text' placeholder='enter position'/>
            </div>
            <div className='details'>
              <label htmlFor=''>Phone No.</label>
              <input type='number' placeholder='enter phone number'/>
            </div>
            <div className='details'>
              <label htmlFor=''>Date:</label>
              <input type='text' value={dateNow} disabled/>
            </div>
          </div>
          <div>
            <p>Sir/Madam,</p>
            <p className='title__3'>Permission is requested to leave the Office to attend to:</p>
            <div className='select'>
              <div>
                <input
                  type='radio'
                  id='personal'
                  value='Personal'
                  checked={selectedOption === 'Personal'}
                  onChange={handleOptionChange}
                  className={selectedOption === 'Personal' ? 'selected' : ''}
                />
                <label htmlFor='personal' className='select1'>
                  Personal
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='official'
                  value='Official'
                  checked={selectedOption === 'Official'}
                  onChange={handleOptionChange}
                  className={selectedOption === 'Official' ? 'selected' : ''}
                />
                <label htmlFor='official' className='select1'>
                  Official
                </label>
              </div>
            </div>
            <p className='title__4 title__3'>(Specify Office/Place to be visited)</p>
            <textarea className='text__area' name='' id='' cols='' rows='5'></textarea>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default PassSlip;
