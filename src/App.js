import React from 'react';
import Modal from "./modal"
import Header from "./header"
import Form from "./form"

function App() {
  return (
    <div className="main">
      <Header />
      <div className='container'>        
        <Modal />
        <Form />
      </div>
    </div>
  );

}

export default App;
