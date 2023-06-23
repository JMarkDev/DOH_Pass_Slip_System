import React, { useState } from 'react';
import DOH_logo from "../assets/DOH_SEAL_-_FULL_COLOR.png"

function PassSlip() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => { 
    setSelectedOption(event.target.value);
  };

  return (
    <div className='pass_slip'>
      <div>
        <form>
          <h1 className='title'>Permit Slip</h1>
          <p className='title__2'>(To be prepared In duplicate Org. SG Dup. HRMP)</p>
          <div className='date'>
            <div>
              <label htmlFor=''>No.</label>
              <input type='text' />
            </div>
            <div>
              <label htmlFor=''>Date:</label>
              <input type='date' />
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
            <textarea name='' id='' cols='85' rows='5' style={{ resize: 'none' }}></textarea>
          </div>
          <button className='submit__btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PassSlip;
