import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [currentBg, setCurrentBg] = useState(0);

  const url =
    "https://script.google.com/macros/s/AKfycbz0tWZYRTZQim9COZs2-hdXgl9_qU6S2TZ3WMZxqtNXZ3CDt0y9I2Ond3YkPseKmumK/exec";

  const bgImages = ["/3.png", "/5.png", "/6.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
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

      setResult("✅ You’re on the guest list!");
      setShowForm(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      setResult("❌ Something went wrong!");
    }
  };

  return (
    <div>
      {/* 🎞️ BACKGROUND */}
      <div
        style={{
          backgroundImage: `url(${bgImages[currentBg]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: -2,
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* 🌑 DARK OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: -1,
        }}
      />

      {/* 💬 CONTENT */}
      <div className="d-flex justify-content-center align-items-center text-center text-white"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        {!submitted ? (
          <>
            {showForm ? (
              <div
                className="p-4"
                style={{
                  maxWidth: "420px",
                  width: "100%",
                  backdropFilter: "blur(15px)",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  animation: "fadeIn 0.6s ease",
                }}
              >
                <button
                  className="btn-close btn-close-white ms-auto"
                  onClick={() => setShowForm(false)}
                ></button>

                <h3 className="fw-bold mb-3">
                  Join Our Special Day 💍
                </h3>

                <p className="mb-4 text-light">
                  Your presence means everything to us ✨
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    required
                  />

                  <input
                    name="phone"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email Address"
                    required
                  />

                  <button className="btn btn-success w-100 fw-bold">
                    Submit 💌
                  </button>
                </form>

                <p className="mt-3 text-success fw-bold">{result}</p>
              </div>
            ) : (
              <div style={{ animation: "fadeInUp 1s ease" }}>
                <h1 className="fw-bold mb-3">
                  You're Invited 💖
                </h1>

                <p className="fs-5 mb-4">
                  A beautiful beginning deserves beautiful people. <br />
                  Come celebrate love with us ✨
                </p>

                <button
                  className="btn btn-success btn-lg px-4"
                  onClick={() => setShowForm(true)}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "scale(1)")
                  }
                >
                  Celebrate With Us 🎉
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ animation: "fadeIn 1s ease" }}>
            <img
              src="/9.png"
              className="img-fluid rounded shadow-lg mb-3"
              style={{ maxWidth: "500px" }}
            />

            <a
              href="/9.png"
              download
              className="btn btn-outline-light"
            >
              Download Invitation 📩
            </a>
          </div>
        )}
      </div>

      {/* 🎬 ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}