import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Loader from "../componets/Loader/Loader";
import BookCard from "../componets/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get("https://bookora-backend-4nea.onrender.com/api/v1/get-all-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentBooks();
  }, []);

  // derive language options from data
  const languages = useMemo(() => {
    const setLang = new Set();
    Data.forEach((b) => b.language && setLang.add(b.language));
    return ["All", ...Array.from(setLang)];
  }, [Data]);

  // client-side filtered + sorted books
  const filtered = useMemo(() => {
    if (!Data) return [];
    const term = searchTerm.trim().toLowerCase();
    let res = Data.filter((b) => {
      // search in title, author and description
      if (term) {
        const inTitle = b.title?.toLowerCase().includes(term);
        const inAuthor = b.author?.toLowerCase().includes(term);
        const inDesc = b.desc?.toLowerCase().includes(term);
        if (!(inTitle || inAuthor || inDesc)) return false;
      }
      if (languageFilter && languageFilter !== "All") {
        if ((b.language || "") !== languageFilter) return false;
      }
      const price = Number(b.price || 0);
      if (minPrice !== "" && !Number.isNaN(Number(minPrice))) {
        if (price < Number(minPrice)) return false;
      }
      if (maxPrice !== "" && !Number.isNaN(Number(maxPrice))) {
        if (price > Number(maxPrice)) return false;
      }
      return true;
    });

    // sorting
    if (sortBy === "price-asc") {
      res.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      res.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title-asc") {
      res.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      res.sort((a, b) => b.title.localeCompare(a.title));
    }

    return res;
  }, [Data, searchTerm, languageFilter, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setLanguageFilter("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("none");
  };

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>

      {/* Search & Filters - beginner friendly */}
      <div className="mt-6 bg-zinc-800 p-4 rounded flex flex-col md:flex-row gap-3 items-start md:items-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author or description"
          className="px-3 py-2 rounded bg-zinc-700 text-zinc-100 flex-1"
        />

        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="px-3 py-2 rounded bg-zinc-700 text-zinc-100"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          className="px-3 py-2 rounded bg-zinc-700 text-zinc-100 w-28"
        />

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="px-3 py-2 rounded bg-zinc-700 text-zinc-100 w-28"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded bg-zinc-700 text-zinc-100"
        >
          <option value="none">Sort</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>

        <button
          onClick={clearFilters}
          className="px-3 py-2 rounded bg-zinc-600 text-zinc-200"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mt-4 text-zinc-300">Showing {filtered.length} of {Data.length} books</div>
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {filtered.length > 0 ? (
              filtered.map((items, i) => (
                <div key={i}>
                  <BookCard data={items} />
                </div>
              ))
            ) : (
              <p className="text-white">No books match your filters.</p>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default AllBooks;
