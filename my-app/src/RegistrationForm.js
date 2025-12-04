   import React, { useState } from 'react';

   function RegistrationForm() {
     const [username, setUsername] = useState('');
     const [carModel, setCarModel] = useState('');

     const handleSubmit = (event) => {
       event.preventDefault();
       console.log('Username:', username);
       console.log('Car Model:', carModel);
       // Här kan du skicka data till backend eller hantera inloggning
     };

     return (
       <form onSubmit={handleSubmit}>
         <div>
           <label>
             Användarnamn:
             <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
             />
           </label>
         </div>
         <div>
           <label>
             Bilmodell:
             <input
               type="text"
               value={carModel}
               onChange={(e) => setCarModel(e.target.value)}
             />
           </label>
         </div>
         <button type="submit">Registrera</button>
       </form>
     );
   }

   export default RegistrationForm;
   