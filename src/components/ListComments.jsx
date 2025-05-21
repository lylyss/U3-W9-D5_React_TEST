import React, { useState, useEffect } from "react";
import { Button, Spinner, ListGroup } from "react-bootstrap";

export default function ListComments({ movieId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments && movieId) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments, movieId]);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkYmNlZjVhYjJjNDAwMTVlMjJhMTAiLCJpYXQiOjE3NDc4Mjc5NTEsImV4cCI6MTc0OTAzNzU1MX0.TrAkdj4Im2XwRwQbHrNU_TbOFL1iXCU4tXIiUcLZT7Q",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        throw new Error("Errore durante il recupero dei commenti.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button
        variant="outline-light"
        className="border-top-0 border-start-0 border-end-0 rounded-0 "
        onClick={() => setShowComments(!showComments)}
        aria-expanded={showComments}
      >
        {showComments ? "Nascondi Commenti" : "Commenti"}
      </Button>

      {showComments && (
        <div className="mt-3">
          {loading && <Spinner animation="border" variant="light" />}
          {error && <p className="text-danger">{error}</p>}
          {!loading && comments.length === 0 && <p className="text-white">Nessun commento trovato.</p>}
          {!loading && comments.length > 0 && (
            <ListGroup>
              {comments.map((comment) => (
                <ListGroup.Item key={comment._id} className="bg-dark text-white border-secondary rounded-0 mb-2">
                  <p className="mb-1">
                    <strong>Utente:</strong> {comment.author || "Anonimo"}
                  </p>
                  <p className="mb-1">
                    <strong>Voto:</strong> {comment.rate}/5
                  </p>
                  <p className="mb-0">{comment.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      )}
    </div>
  );
}
