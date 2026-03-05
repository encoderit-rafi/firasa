import React from "react";

export default function RefundPolicy() {
  return (
    <section className="section bg-white px-4 font-inter">
      <div className="container-md mx-auto">
        <h1 className="page-title">Refund Policy</h1>

        <div className="page-space-lg">
          <div className="page-space-md">
            <h2 className="page-subtitle">1. Digital Service Nature</h2>
            <div className="page-space-sm">
              <p className="page-description">
                Firasa provides instant digital AI-generated analysis.
              </p>
              <p className="page-description">
                Due to the immediate delivery of reports:
              </p>
              <p className="page-description font-medium">
                Refunds are generally not provided once analysis has been
                processed.
              </p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">2. Subscription Plans</h2>
            <div className="page-space-sm">
              <p className="page-description">For subscription-based plans:</p>
              <ul className="page-list">
                <li className="page-description">Users may cancel anytime.</li>
                <li className="page-description">
                  No refunds for partial billing cycles.
                </li>
                <li className="page-description">
                  Access remains active until the end of the billing period.
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">3. Technical Errors</h2>
            <div className="page-space-sm">
              <p className="page-description">Refunds may be issued if:</p>
              <ul className="page-list">
                <li className="page-description">
                  The system fails to generate a report
                </li>
                <li className="page-description">
                  A verified technical malfunction occurs
                </li>
              </ul>
              <p className="page-description">
                Requests must be submitted within 7 days of purchase to{" "}
                <a
                  href="mailto:refund@firasa.ai"
                  className="text-primary hover:underline"
                >
                  refund@firasa.ai
                </a>
              </p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">4. Enterprise Agreements</h2>
            <p className="page-description">
              Enterprise clients are governed by separate contractual
              agreements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
