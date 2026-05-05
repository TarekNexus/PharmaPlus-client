"use client";

export default function TermsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-gray-700 font-satoshi md:mt-30">
      <h1 className="text-4xl font-bold text-[#FF7A1A] mb-6 text-center">
        Terms & Conditions
      </h1>

      <p className="mb-4 text-center">
        Welcome to <span className="font-semibold">Pharmaplus</span>. By using our platform, you agree to the following terms and conditions.
      </p>

      <div className="space-y-6 mt-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing Pharmaplus, you agree to comply with these Terms and all applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            2. User Accounts
          </h2>
          <p>
            You are responsible for maintaining your account credentials and ensuring your information is accurate.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            3. Use of Service
          </h2>
          <p>
            You agree not to misuse the platform, including illegal activities or unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            4. Orders & Payments
          </h2>
          <p>
            Orders are subject to availability. Prices may change without notice. Payments must be completed securely.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            5. Medical Disclaimer
          </h2>
          <p>
            Pharmaplus does not provide medical advice. Always consult a professional before using medication.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any damages resulting from the use of our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            7. Changes to Terms
          </h2>
          <p>
            We may update these terms anytime. Continued use means you accept the changes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            8. Contact
          </h2>
          <p>
            Contact us at <span className="font-semibold">support@pharmaplus.com</span>
          </p>
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-500 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </section>
  );
}