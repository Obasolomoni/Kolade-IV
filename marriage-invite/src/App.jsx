import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const url =
    "https://script.google.com/macros/s/AKfycbz0tWZYRTZQim9COZs2-hdXgl9_qU6S2TZ3WMZxqtNXZ3CDt0y9I2Ond3YkPseKmumK/exec";

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
    <div>
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
                Submit Your Details
              </h4>
              <p className="text-center text-muted mb-4">
                Fill the form below to continue
              </p>

              <form id="dataForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
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
            <button
              className="btn btn-success btn-lg mt-4"
              onClick={() => setShowForm(true)}
            >
              Continue to Registration
            </button>
          )}
        </>
      ) : (
        <img
          src="/1.png"
          alt="After Submission"
          className="img-fluid rounded shadow-lg"
          style={{ maxWidth: "500px" }}
        />
      )}
    </div>
  );
}
