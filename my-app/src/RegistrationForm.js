   import React, { useState, useEffect } from 'react';

   function RegistrationForm({ onRegister, onLogin, selectedCarModel, setSelectedCarModel }) {
       const [username, setUsername] = useState('');
       const [carModels, setCarModels] = useState([]);
       const [password, setPassword] = useState('');

    useEffect(() => {
    // Här kan du hämta bilmodeller från backend eller ett API
    fetch('http://localhost:8080/api/car-models')
      .then(response => response.json())
      .then(data => setCarModels(data));
  }, []);

  const handleCarModelChange = (e) => {
     const modelName = e.target.value;
     const model = carModels.find(m => m.name === modelName);
     setSelectedCarModel(model);
   };

  const handleSubmit = (event) => {
     event.preventDefault();
     fetch('http://localhost:8080/api/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password, carModel: selectedCarModel?.name }),
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
       onRegister({ username, carModel: data.carModel });
       handleLogin();

       // Uppdatera med bilmodell och räckvidd
       setSelectedCarModel({
         name: data.carModel,
         range: data.range,
       });
     })
     .catch((error) => {
       console.error('Error:', error);
     });
   };
   
    const handleLogin = () => {
     fetch('http://localhost:8080/api/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
     })
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
       onLogin({ username, carModel: data.carModel });

       // Uppdatera med bilmodell och räckvidd
       setSelectedCarModel({
         name: data.carModel,
         range: data.range,
       });
     })
     .catch((error) => {
       console.error('Error:', error);
     });
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
          <label>
             Bilmodell:
             <select value={selectedCarModel.name || ''} onChange={handleCarModelChange}>
               <option value="">Välj en modell</option>
               {carModels.map((model) => (
                 <option key={model.id} value={model.name}>
                   {model.name} - Räckvidd: {model.range} km
                 </option>
               ))}
             </select>
           </label>
         </div>
         {selectedCarModel.name && (
           <div>
             <p>Vald bilmodell: {selectedCarModel.name}</p>
             <p>Räckvidd: {selectedCarModel.range} km</p>
           </div>
         )}
         <div className="button-group">
           <button type="button" onClick={handleLogin}>Logga In</button>
           <button type="submit">Registrera</button>
         </div>
       </form>
     );
    }

export default RegistrationForm;