import { Auth } from "./components/auth"
import { db, auth,storage } from './config/firebase'
import { useEffect, useState } from "react"
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage";

function App() {

  const [movieList, setMovieList] = useState([]);

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMoviewOscar, setIsNewMoviewOscar] = useState(false);

  //update movive title state
  const [updateMovieTitle, setUpdateMovieTitle] = useState('');

  //File upload state
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // Read Data
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };


  //DELETE MOVIE FUNC
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
    getMovieList();
  }

  //UPDATE MOVIE FUNC

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updateMovieTitle });
    getMovieList();
  }

  useEffect(() => {
    getMovieList();
  }, [])


  //ADD MOVIE FUNC

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, { title: newMovieTitle, releaseDate: newReleaseDate, receivedAnOscar: isNewMoviewOscar, userId:auth?.currentUser?.uid });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  }

  //UPLOAD FILES
  const uploadFile = async () =>{
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div><Auth />

        <div>

          <input placeholder="movie name" onChange={(e) => setNewMovieTitle(e.target.value)} />
          <input placeholder="release date" type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
          <input type="checkbox" checked={isNewMoviewOscar} onChange={(e) => setIsNewMoviewOscar(e.target.checked)} />

          <label>Received an Oscar</label>
          <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>

        <div>
          {movieList.map((movie) => (

            <div>
              <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'blue' }}>{movie.title}</h1>
              <p>Date: {movie.releaseDate}</p>
              <input placeholder="enter moive title to update" onChange={(e) => setUpdateMovieTitle(e.target.value)} />
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              <button onClick={() => updateMovie(movie.id)}>Update</button>
            </div>
          ))}
        </div>

        <div>
            <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
            <button onClick={uploadFile}>Upload</button>
        </div>
      </div>
    </>
  )
}

export default App
