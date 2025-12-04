   import React, { useState } from 'react';

   function RegistrationForm() {
     const [username, setUsername] = useState('');
     const [carModel, setCarModel] = useState('');
      const [password, setPassword] = useState('');

     const handleSubmit = (event) => {
       event.preventDefault();
       console.log('Username:', username);
       console.log('Password:', '******'); // Never log passwords in real applications
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
             Lösenord:
             <input
               type="text"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
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
         <div className="button-group">
         <button type="button">Logga In</button>
         <button type="submit">Registrera</button>
         </div>
       </form>
     );
   }

   export default RegistrationForm;
   