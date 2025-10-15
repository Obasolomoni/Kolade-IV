import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [currentBg, setCurrentBg] = useState(0);

  const url =
    "https://script.google.com/macros/s/AKfycbz0tWZYRTZQim9COZs2-hdXgl9_qU6S2TZ3WMZxqtNXZ3CDt0y9I2Ond3YkPseKmumK/exec";

  // 🖼️ Add your background images here
  const bgImages = [
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
  ];

  // 🎞️ Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      date: new Date().toISOString(),
    };

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setResult("✅ Form submitted!");
      setShowForm(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      setResult("❌ Submission failed!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImages[currentBg]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {!submitted ? (
        <>
          {showForm ? (
            <div
              className="card form-card p-4 shadow-lg bg-white rounded"
              style={{ maxWidth: "420px", width: "100%" }}
            >
              <button
                type="button"
                className="btn-close ms-auto"
                aria-label="Close"
                onClick={() => setShowForm(false)}
              ></button>

              <h4 className="text-center text-primary mb-3">
                We’d Love to Have You With Us 💍
              </h4>
              <p className="text-center text-muted mb-4">
                Kindly share your details to join our special day ✨
              </p>

              <form id="dataForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Beautiful Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="We’ll keep you updated here"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Share your email with us"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>

              <p id="result" className="mt-3 fw-bold text-center text-success">
                {result}
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-light fs-5 mb-3 text-shadow">
                A love story worth celebrating deserves the people who matter
                most. <br />
                Be part of our joy as we say “I do.” 💖
              </p>

              <button
                className="btn btn-success btn-lg mt-4"
                onClick={() => setShowForm(true)}
              >
                Celebrate With Us 🎉
              </button>
            </>
          )}
        </>
      ) : (
        <div className="text-center">
          <img
            src="/1.png"
            alt="Wedding Invitation"
            className="img-fluid rounded shadow-lg mb-3"
            style={{ maxWidth: "500px", display: "block", margin: "0 auto" }}
          />

          <a
            href="/1.png"
            download="Wedding-IV"
            className="btn btn-outline-light mt-2"
            style={{ display: "inline-block" }}
          >
            Download Invitation 📩
          </a>
        </div>
      )}
    </div>
  );
}
