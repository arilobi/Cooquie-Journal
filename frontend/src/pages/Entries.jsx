import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { EntryContext } from "../context/EntryContext";
import { UserContext } from "../context/UserContext";

export default function Entries() {
  const { entries, deleteEntry } = useContext(EntryContext);
  const { current_user } = useContext(UserContext);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Ref for scroll animation
  const cardsRef = useRef([]);

  // Scroll animation logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Reverse entries for the new entries to come first
  const reversedEntries = entries ? [...entries].reverse() : [];

  // Pagination area
  const totalEntries = reversedEntries.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = reversedEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="entries">
      <div className="linkto-entry">
        <Link to="/addentry">How are you feeling today?</Link>
      </div>

      {currentEntries.length < 1 ? (
        <div className="no-entries">
          {entries && entries.length > 0
            ? "No entries on this page."
            : "You don't have any entries."}
        </div>
      ) : (
        <>
          <div className="home">
            {currentEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="entry-card"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <Link to={`/entry/${entry.id}`} className="entries-title">
                  {entry.title}
                </Link>

                <div className="functions">
                  <p className="date-created">
                    {new Date(entry.date_created).toLocaleString()}
                  </p>

                  <span
                    onClick={() => deleteEntry(entry.id)}
                    className="delete-btn"
                    style={{ cursor: "pointer" }}
                  >
                    DELETE
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>

              <div className="page-numbers">
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`page-number ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {entries && entries.length > 0 && (
        <div className="page-info">
          Showing {indexOfFirstEntry + 1}-
          {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
        </div>
      )}
    </div>
  );
}
