import { useState, useEffect } from 'react';

import Collection from './Collection';

const categories = [{ name: 'Все' }, { name: 'Море' }, { name: 'Горы' }, { name: 'Архитектура' }, { name: 'Города' }];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const categoryParam = categoryId ? `category=${categoryId}` : '';
    const pageParam = `page=${page}`;
    const limitParam = 'limit=3';
    fetch(`https://63e7c3b0cbdc5658737cf671.mockapi.io/photo-collections?${categoryParam}&${pageParam}&${limitParam}`)
      .then((response) => response.json())
      .then((json) => setCollections(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [categoryId, page]);

  return (
    <div className='App'>
      <h1>Моя коллекция фотографий</h1>
      <div className='top'>
        <ul className='tags'>
          {categories.map((item, index) => (
            <li className={categoryId === index ? 'active' : ''} key={item.name} onClick={() => setCategoryId(index)}>
              {item.name}
            </li>
          ))}
        </ul>
        <input
          className='search-input'
          placeholder='Поиск по названию'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className='content'>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) => <Collection key={index} name={item.name} images={item.photos} />)
        )}
      </div>
      <ul className='pagination'>
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            className={page === index + 1 ? 'active' : ''}
            onClick={() => {
              setPage(index + 1);
            }}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
