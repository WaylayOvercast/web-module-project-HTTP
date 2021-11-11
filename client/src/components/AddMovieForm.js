import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddMovieForm = (props) => {
	const { push } = useHistory();
	const newId = props.appState.length+1

	const [newMovie, setNewMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: "",
        id: newId
	});


	const updateMovie =(e)=>{

        axios.post(`http://localhost:5000/api/movies`,e)
        .then(res=>{
			props.setAppState(res.data)
			console.log(res)
			push(`/movies`)
        })
        .catch(err=>{
        	console.log('ERROR: ',err);
        })
	}


	const handleChange = (e) => {
		setNewMovie({
			...newMovie,
            [e.target.name]: e.target.value
		})
    }

    const handleSubmit = (e) => {
		e.preventDefault();
		updateMovie(newMovie)
	}
	
	const { title, director, genre, metascore, description } = newMovie;

    return (
			<form onSubmit={handleSubmit}>
				<div>						
					<h4 >NewMovie<strong>{newMovie.title}</strong></h4>
				</div>
							
				
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" />
			
			
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" />
				
				
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" />
				
					
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number"/>
				
					
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" ></textarea>
					
									
					    
					<input type="submit" value="submit"/>
			</form>);
}

export default AddMovieForm;