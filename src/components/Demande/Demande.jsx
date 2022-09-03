import React, { useEffect, useState } from 'react';
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
	{ field: "id", headerName: "#", width: 120, headerClassName: 'super-app-theme--header',sortable: true, hideable: false },
	{ field: "code", headerName: "Code", width: 120, sheaderClassName: 'super-app-theme--header',ortable: true },
	{ field: "designation", headerName: "Désignation", width: 400,headerClassName: 'super-app-theme--header', sortable: true },
];


const AppStyledProvider = styled.div`
	height: 500px;
	width: 90%;
	margin: auto;
`;

const StyledTextField = styled(TextField)`
	margin: 10px 0;
	width: 200px;
`;



const DeamndeGarantie = () => {
	const [searchWord, setSearchWord] = useState("");
	const [show, setShow] = useState(false);
	const [Serie, setSerie] = useState("");
	const [RowsData, setRowsData] = useState([]);
	const [RowData, setRowData] = useState([]);


	const new_repositoryListSerial =
		repositoryListSerial.map((row) => ({
			'id': row['id'], 'product_id': row['product_id'][0], 'product': row['product_id'][1], 'name': row['name']
		})
		)


	const globalSearch = () => {
		const filteredRepositories = new_repositoryListSerial.filter((value) => {
			return (
				value?.name?.toString().toLowerCase().includes(searchWord?.toLowerCase())
			);
		});

		return filteredRepositories;
	};

	const filterRepositoryList = searchWord
		? globalSearch()
		: new_repositoryListSerial;


	function open_backdrop(new_repositoryListSerial) {
		if (new_repositoryListSerial.length > 0) { return false }
		else { return true }
	}


	const SelectTableRows = (Id_histo) => {
		const selectedRowData = RowsData.filter((row) =>
			row.id.toString() === Id_histo[0].toString()
		);
		console.log(selectedRowData);
		setRowData(selectedRowData);
		console.log(RowData);
	}

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	useEffect((Serie) => {
		getData(Serie);
	}, [Serie]);

	const getData = async (Serie) => {

		const url = "http://localhost:5000/Histo/" + String(Serie)

		const res = await axios.get(`${url}`);

		setRowsData(
			res.data.map((row) => ({
				id: row.id,
				Modele: row.Modele,
				Serie: row.Numero_Serie,
				DateDebut: new Date(row.Date_Debut_Garantie).toLocaleDateString('fr-FR'),
			}))
		)
	}


	return (
		<div>
			<h2>Garantie</h2>
			<AppStyledProvider>
				<h2>Liste des articles sérialisés</h2>
				<div style={{ alignContent: CenterFocusWeak }}>
					<Button variant="primary" onClick={handleShow}>
						Recherche d'un numéro de série
					</Button>
					<br />
					<StyledTextField
						value={searchWord}
						onChange={(event) => setSearchWord(event.target.value)}
						label="Zone de recherche"
						variant="outlined"
					/>
				</div>
				<DataGrid
					rows={filterRepositoryList && filterRepositoryList}
					columns={columns}
					pageSize={10}
					loading={open_backdrop(new_repositoryListSerial)}
					autoPageSize={true}
					sx={{
						boxShadow: 2,
						color: "success.main"	
					}}
				/>
			</AppStyledProvider>
			<div  >
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
					dialogClassName="MyModal"
				>
					<Modal.Header closeButton>
						<Modal.Title>Recherche d'un numéro de série sur base</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<StyledRechField
							label="Zone de recherche"
							variant='outlined'
							onChange={event => setSerie(event.target.value)}
						/>
						<br />
						<div style={{ height: '300px' }}>
							<DataGrid
								rows={RowsData}
								columns={columns1}
								pageSize={10}
								autoPageSize={true}
								onSelectionModelChange={(ids) => {
									SelectTableRows(ids)
								}}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button color="red" onClick={() => getData(Serie)} >
							Rechercher
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Close
						</Button>

					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default RepositorySerial;



