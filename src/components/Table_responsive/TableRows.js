function TableRows({rowsData, selectTableRows, handleChange}) {
    return(
        
        rowsData.map((data, index)=>{
            const {Modele, Serie, DateDebut}= data;
            return(
                <tr key={index}>
                <td>
               <input type="text" value={Modele} onChange={(evnt)=>(handleChange(index, evnt))} name="Modele" className="form-control" disabled/>
                </td>
                <td><input type="text" value={Serie}  onChange={(evnt)=>(handleChange(index, evnt))} name="Serie" className="form-control" disabled/> </td>
                <td><input type="text" value={DateDebut}  onChange={(evnt)=>(handleChange(index, evnt))} name="DateDebut" className="form-control" disabled/> </td>
                <td><button className="btn btn-secondary" onClick={()=>(selectTableRows(index))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;
