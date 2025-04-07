import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Project } from '../types/project'; // 👈

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]); // 👈
  const handleSearch = () => {
    axios.get(`http://localhost:3000/projects/search?q=${query}`).then((res) => {
      setResults(res.data);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Rechercher un projet</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Rechercher
      </button>

      <ul className="mt-4 space-y-2">
        {results.map((r) => (
          <li key={r.id}>
            <Link to={`/project/${r.id}`} className="underline text-blue-500">
              {r.fields?.Titre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
