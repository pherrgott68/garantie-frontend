import { useState } from "react"
import TableRows from "./TableRows"
import useRechSerie from "../Hooks/useRechSerie";


function AddTableRows() {
    
    const [rowsData, setRowsData] = useState([]);
    const rech = useRechSerie();
        
    
        const rowsInput={
            Modele:'',
            Serie:'',
            DateDebut:''  
        } 
        var i = 0;
        for (i = 0; i < rech.length; i++) {
            setRowsData( [...{ 'Modele': rech[i]['Modele'], 'Serie': rech[i]['Numero_Serie'], 'DateDebut': rech[i]['Date_Debut_Garantie']},rowsInput])
        }
    


    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                <table className="table">
                    <thead>
                      <tr>
                          <th>#</th>
                          <th>Modèle</th>
                          <th>Numéro de série</th>
                          <th>Date de départ</th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={rowsData} />
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
    )
}
export default AddTableRows