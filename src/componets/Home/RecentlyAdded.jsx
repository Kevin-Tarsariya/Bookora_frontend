import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get("https://bookora-backend-4nea.onrender.com/api/v1/get-recent-books"); 
        setData(response.data.data); 
      } catch (error) {
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <div>
        <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {data.length > 0 ? (
            data.map((item, i) => (
              <div key={i}>
                <BookCard data={item} />
              </div>
            ))
          ) : (
            <p className="text-white col-span-full">No recent books found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
