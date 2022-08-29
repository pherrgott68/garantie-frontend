import React from 'react';
import "../Home/Home.css"


export default function Default() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const societe = token['Partner'][0]['company_name'];
  const user = token['username'];

return(
<div>
    <h2>Home</h2>
    <br/>
    <div className="intro"><h1>Bienvenue {user} de la {societe} au site RedElectric de la gestion de la garantie.</h1>
    <br/>
    <h3><p>Nous voulons vous offrir le meilleur service pour la gestion de vos garanties. N'hésitez pas à remonter toutes vos remarques à l'adresse suivante : support@redelectric.fr</p></h3>
    </div>
</div> 
  );
}
