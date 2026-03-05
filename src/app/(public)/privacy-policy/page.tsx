import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="section bg-white px-4 font-inter">
      <div className="container-md mx-auto">
        <h1 className="page-title">Privacy Policy</h1>

        <div className="page-space-lg">
          <p className="page-description italic">
            Since Firasa processes video, audio, and biometric-like behavioral
            signals, this page is extremely important.
          </p>

          <div className="page-space-md">
            <h2 className="page-subtitle">1. Information We Collect</h2>
            <div className="page-space-sm">
              <p className="page-description">We may collect:</p>
              <ul className="page-list">
                <li className="page-description">Uploaded videos</li>
                <li className="page-description">Audio recordings</li>
                <li className="page-description">Text inputs</li>
                <li className="page-description">Questionnaire responses</li>
                <li className="page-description">Email address</li>
                <li className="page-description">Usage data</li>
                <li className="page-description">Device information</li>
                <li className="page-description">IP address</li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">2. How We Use Information</h2>
            <div className="page-space-sm">
              <p className="page-description">We use data to:</p>
              <ul className="page-list">
                <li className="page-description">
                  Generate AI personality reports
                </li>
                <li className="page-description">Improve our models</li>
                <li className="page-description">Maintain security</li>
                <li className="page-description">Provide customer support</li>
                <li className="page-description">
                  Comply with legal obligations
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">3. Data Storage & Security</h2>
            <ul className="page-list">
              <li className="page-description">
                Data is stored securely using encrypted infrastructure.
              </li>
              <li className="page-description">
                Access is limited to authorized systems.
              </li>
              <li className="page-description">
                We implement industry-standard security protocols.
              </li>
            </ul>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">4. Data Retention</h2>
            <div className="page-space-sm">
              <p className="page-description">
                User-submitted content is stored:
              </p>
              <ul className="page-list">
                <li className="page-description">
                  For the duration of active subscription
                </li>
                <li className="page-description">
                  Or deleted upon user request (where legally permitted)
                </li>
              </ul>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">5. Third-Party Services</h2>
            <div className="page-space-sm">
              <p className="page-description">
                We may use secure third-party infrastructure providers for:
              </p>
              <ul className="page-list">
                <li className="page-description">Cloud hosting</li>
                <li className="page-description">Payment processing</li>
                <li className="page-description">Analytics</li>
              </ul>
              <p className="page-description">We do not sell user data.</p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">6. User Rights</h2>
            <div className="page-space-sm">
              <p className="page-description">
                Depending on jurisdiction, users may:
              </p>
              <ul className="page-list">
                <li className="page-description">
                  Request access to their data
                </li>
                <li className="page-description">Request correction</li>
                <li className="page-description">Request deletion</li>
                <li className="page-description">Withdraw consent</li>
              </ul>
              <p className="page-description">
                Requests can be submitted via:{" "}
                <a
                  href="mailto:support@firasa.ai"
                  className="text-primary hover:underline"
                >
                  support@firasa.ai
                </a>
              </p>
            </div>
          </div>

          <div className="page-space-md">
            <h2 className="page-subtitle">7. Children's Privacy</h2>
            <p className="page-description">
              Firasa is not intended for users under 18.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
