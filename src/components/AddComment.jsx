import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function AddComment({ movieId, onCommentAdded }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!movieId) {
      setError("ID del film non disponibile.");
      return;
    }

    const newComment = {
      comment: comment,
      rate: rating,
      elementId: movieId, // ID
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkYmNlZjVhYjJjNDAwMTVlMjJhMTAiLCJpYXQiOjE3NDc4Mjc5NTEsImV4cCI6MTc0OTAzNzU1MX0.TrAkdj4Im2XwRwQbHrNU_TbOFL1iXCU4tXIiUcLZT7Q",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const data = await response.json();
        setComment("");
        setRating(0);
        if (onCommentAdded) {
          onCommentAdded(data);
        }
        alert("Commento aggiunto con successo!");
      } else {
        throw new Error("Aggiungi un commento.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="mb-2">Vota il film:</h5>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={star <= (hover || rating) ? faStarSolid : faStarRegular}
            style={{ color: "#FFD700", cursor: "pointer", fontSize: 28 }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>
      <Form className="mt-3 ">
        <Form.Group controlId="comment">
          <Form.Label>Lascia un commento:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Scrivi qui il tuo commento..."
            className="bg-dark text-white border-secondary rounded-0"
            style={{ resize: "none" }}
          />
        </Form.Group>
        {error && <p className="text-danger mt-2">{error}</p>}
        <Button variant="outline-light" className="mt-2 rounded-0" type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Invio in corso..." : "Invia Feedback"}
        </Button>
      </Form>
    </div>
  );
}
