import { useEffect, useState } from "react";
import axios from "axios";

const useRepositorySerie =  () => {

	const [repositoryList, setRepositoryList] = useState([]);

	useEffect(() => {
		const params = JSON.parse(sessionStorage.getItem("token"))
		var client_id=params['Partner'][0]['id']

			const url = "http://localhost:5000/Garantie/" + String(client_id)

		const getRepositories = () => {
			return axios.get(`${url}`);
		};

		getRepositories()
			.then((e) => setRepositoryList(e.data))
			.catch((err) => console.log(err));
	},[]);
	return repositoryList;
};

export default useRepositorySerie;

