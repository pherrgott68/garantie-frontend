import * as React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  randomId,
} from '@mui/x-data-grid-generator';



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id,  quantite: 0, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id_article' },
    }));

  };

  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick} >
        Ajout
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setRowsArticles: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowsNomen, setRowsNomen] = React.useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [sel_nom, setSel_nom] = useState('');
  const [sel_art, setSel_art] = useState('');
  const [sel_tous, setSel_tous] = useState('');
  const [ret_u, setRowRetour] = useState('')
  const [rowsArticles, setRowsArticles] = useState([])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    const url = "http://localhost:5000/D_Nomenclature"
    console.log(id);
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.post(url,JSON.parse(id))
        .then((ret)=> setRowRetour(ret))
        .catch((err)=> console.log(err));      

        return ret_u;
  
    };
  
  
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    let updatedRow= { ...newRow};

    if(!newRow.isNew){
     updatedRow= { ...newRow, isNew: false };
    } else 
    {
     updatedRow= { ...newRow, id_nomenclature:  sel_nom };
    }

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const url = "http://localhost:5000/U_Nomenclature"

    axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(url,JSON.stringify(updatedRow))
        .then((ret)=> setRowRetour(ret))
        .catch((err)=> console.log(err));      
    
    SetData(sel_nom);
        return updatedRow;

      };


//###############Initialisation des listes
     useEffect(()=>{
      Lst_articles();
      setSel_art('Tous')
     },[sel_art])

    useEffect(()=>{
      setSel_tous('Tous');
      SetNomen();
    },[sel_tous]
    )
    
 //##############Hooks   
    const SetNomen = async () => {

      const url = "http://localhost:5000/Nomenclatures/"


      const getNomenclatures = () => {
        return axios.get(`${url}`);
      };

      getNomenclatures()
        .then((res) => setRowsNomen(
          res.data.map((row) => ({
            id: row.id,
            Code_Nomenclature: row.Code_Nomenclature,
            designation: row.designation,
            famille: row.famille
          }))
        ))
        .catch((err) => console.log(err));

    return rowsNomen;
  }


  const SetData = async (sel_nom) => {

    const url = "http://localhost:5000/Nomenclature/" + String(sel_nom)

    
    const getNomenclature = () => {
      return axios.get(`${url}`);
    };
    getNomenclature()
      .then((res) =>
        setRows(
          res.data.map((row) => ({
            id: row.id_x,
            id_article: row.id_article,
            default_code: row.default_code,
            name: row.name,
            quantite: row.Quantite,
            list_price: row.list_price,
            total: row.Quantite * row.list_price
          })
          )
        ))
      .catch((err) => console.log(err));

    return rows
  }
  
  const HandleChange = (e) => {
    SetData(e.target.value);
    setSel_nom(e.target.value);
  };

  const Lst_articles =  () => {
    
    const url = "http://localhost:5000/Articles"

    
    const getArticles = () => {
      return axios.get(`${url}`);
    };
    getArticles()
    .then((e) => setRowsArticles(e.data))
    .catch((err) => console.log(err));
    return rowsArticles
  }

  
//####Config DataGrid
  const columns = [
    { field: 'id', headerName: 'id', width: 80, editable: false },
    { field: 'id_article', 
    type:"singleSelect",
    headerName: 'id_article', 
    valueOptions: rowsArticles,
    width: 180, editable: true },
    { field: 'default_code', headerName: 'Code', editable: true },
    {
      field: 'name',
      headerName: 'Désignation',
      width: 280,
      editable: false,
    },
    {
      field: 'quantite',
      headerName: 'Quantité',
      type: 'number',
      width: 80,
      editable: true,
    },
    {
      field: 'list_price',
      headerName: 'Prix',
      type: 'number',
      width: 80,
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 80,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (

    <div style={{ padding: 20 }}>
      <Box sx={{ minWidth: 200 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">Nomenclature</InputLabel>
        <NativeSelect
          onChange={HandleChange}
          value={sel_nom}
          inputProps={{
            name: 'désignation',
            id: 'id',
          }}
          >
            {
            rowsNomen.map((row)=> (
               <option key= {row.id} value={row.id}>{row.Code_Nomenclature + ' ' + row.designation}</option> 
            ))
            }
        </NativeSelect>
      </Box>
      <Box
        sx={{
          height: 600,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGridPro
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
