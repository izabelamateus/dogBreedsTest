import React, { useEffect, useState} from 'react';
import api from '../service/api';


export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [selectedBreedImage, setSelectedBreedImage] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); 
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    color: '',
    size: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('breeds/list/all');
        console.log('response', response)
        if (response) {
          setBreeds(Object.keys(response.data.message));
        } else {
          console.error('Erro ao buscar dados das raças: Resposta vazia ou inválida');
        }
      } catch (error) {
        console.error('Erro ao buscar dados das raças:', error);
      }
    };

    fetchData();
  }, []);

  const handleBreedChange = async (event) => {
    const selectedBreed = event.target.value;
    setSelectedBreed(selectedBreed);
    try {
      const response = await api.get(`breed/${selectedBreed}/images/random`);
      setSelectedBreedImage(response.data.message);
    } catch (error) {
      console.error('Erro ao buscar imagem da raça:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, age, color, size } = formData;
    setSubmittedData(formData);
  };


  return (
  <div style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundImage: 'linear-gradient(to left, #808080, #d3d3d3)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20%' }}>
      <h2>Selecione uma Raça de Cachorro</h2>
        <select value={selectedBreed} onChange={handleBreedChange}  style={{ width: '200px', height: '40px', fontSize: '16px', padding: '5px',backgroundColor: '#d3d3d3'}}>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
    </div>

    <div>
    {selectedBreedImage && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="300" height="200" src={selectedBreedImage} alt="Imagem da raça selecionada" style={{margin: '10%'}}/>
        <form onSubmit={handleFormSubmit} style={{margin: '10%'}}>
          <label style={{ display: 'block' }}>
            Apelido:
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ border: 'none', borderBottom: '2px solid black', backgroundColor: '#d3d3d3', height: '20px', }} />
          </label>
          <label style={{ display: 'block' }}>
            Idade:
            <input type="text" name="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })}  style={{ border: 'none', borderBottom: '2px solid black', backgroundColor: '#d3d3d3', height: '20px',}} />
          </label>
          <label style={{ display: 'block' }}>
            Cor:
            <input type="text" name="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} style={{ border: 'none', borderBottom: '2px solid black', backgroundColor: '#d3d3d3', height: '20px',}} />
          </label>
          <label style={{ display: 'block', marginBottom:'10%'}}>
            Tamanho:
            <input type="text" name="size" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} style={{ border: 'none', borderBottom: '2px solid black', backgroundColor: '#d3d3d3', height: '20px',}} />
          </label >
          <button type="submit" style={{ margin: 'auto', display: 'block', width: '50%', height: '30px', fontSize: '1rem',backgroundColor: '#d3d3d3' }}>Salvar</button>
        </form>
      </div>
  )}
      {submittedData && (
        <div>
          <h2>Dados  do seu cachorro:</h2>
          <p>Apelido: {submittedData.name}</p>
          <p>Idade: {submittedData.age}</p>
          <p>Cor: {submittedData.color}</p>
          <p>Tamanho: {submittedData.size}</p>
        </div>
      )}
    </div>
  </div>
  );
}

