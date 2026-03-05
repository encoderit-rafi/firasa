import React from "react";

export default function TermsOfService() {
  return (
    <section className="section bg-white px-4 font-inter">
      <div className="container-md mx-auto">
        <h1 className="page-title">Terms of Service</h1>
        <div className="page-space-lg">
          <div className="page-space-sm">
            <h2 className="page-subtitle">1. Acceptance of Terms</h2>
            <p className="page-description">
              By accessing or using Firasa, you agree to be bound by these Terms
              of Service. If you do not agree, you must not use our platform.
            </p>
          </div>
          <div className="page-space-md">
            <h2 className="page-subtitle">2. Nature of the Service</h2>
            <div className="page-space-sm">
              <p className="page-description">
                Firasa provides AI-generated behavioral and personality analysis
                based on user-submitted:
              </p>
              <ul className="page-list">
                <li>Video</li>
                <li>Audio</li>
                <li>Text</li>
                <li>Questionnaire responses</li>
              </ul>
              <p className="page-description">
                The results are generated using machine learning models and
                statistical analysis. The service does not constitute medical,
                psychological, legal, or employment advice.
              </p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">3. AI Disclaimer</h2>
            <div className="page-space-sm">
              <p className="page-description">You acknowledge that:</p>
              <ul className="page-list">
                <li>
                  AI outputs are probabilistic and not guaranteed accurate.
                </li>
                <li>
                  Results should not be used as the sole basis for major life,
                  legal, or employment decisions.
                </li>
                <li>
                  Firasa is not liable for actions taken based on reports.
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">4. User Responsibilities</h2>
            <div className="page-space-sm">
              <p className="page-description">You agree:</p>
              <ul className="page-list">
                <li className="page-description">
                  To provide lawful content only.
                </li>
                <li className="page-description">
                  Not to upload content without proper consent.
                </li>
                <li className="page-description">
                  Not to use the platform for discrimination, harassment, or
                  unlawful profiling.
                </li>
                <li className="page-description">
                  To ensure you have permission to analyze any third-party
                  video/audio.
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">5. Data Ownership</h2>
            <div className="page-space-sm">
              <p className="page-description">
                You retain ownership of the content you upload.
              </p>
              <p className="page-description">Firasa retains ownership of:</p>
              <ul className="page-list">
                <li className="page-description">AI models</li>
                <li className="page-description">Algorithms</li>
                <li className="page-description">Scoring systems</li>
                <li className="page-description">
                  Generated report structures
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">6. Account Termination</h2>
            <div className="page-space-sm">
              <p className="page-description">
                We may suspend or terminate accounts that:
              </p>
              <ul className="page-list">
                <li className="page-description">Violate these terms</li>
                <li className="page-description">
                  Attempt to reverse-engineer the platform
                </li>
                <li className="page-description">
                  Engage in harmful or illegal use
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">7. Limitation of Liability</h2>
            <div className="page-space-sm">
              <p className="page-description">Firasa is not liable for:</p>
              <ul className="page-list">
                <li className="page-description">Employment decisions</li>
                <li className="page-description">
                  Psychological interpretation misuse
                </li>
                <li className="page-description">Business losses</li>
                <li className="page-description">
                  Indirect or consequential damages
                </li>
              </ul>
              <p className="page-description">
                Use of the platform is at your own risk.
              </p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">8. Modifications</h2>
            <p className="page-description">
              We may update these terms at any time. Continued use constitutes
              acceptance of changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
