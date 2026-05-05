"use client";

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-gray-700 font-satoshi md:mt-30 mt-10">
      <h1 className="text-4xl font-bold text-[#FF7A1A] mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="mb-4 text-center">
        Your privacy is important to us. This policy explains how Pharmaplus collects and uses your data.
      </p>

      <div className="space-y-6 mt-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information such as name, email, and order details when you use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            2. How We Use Information
          </h2>
          <p>
            Your data is used to process orders, improve services, and communicate with you.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            3. Data Protection
          </h2>
          <p>
            We implement security measures to protect your personal information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            4. Cookies
          </h2>
          <p>
            We use cookies to enhance user experience and analyze website traffic.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            5. Third-Party Services
          </h2>
          <p>
            We may use third-party services (like payment gateways) that have their own privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal data.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            7. Changes to Policy
          </h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#FF7A1A] mb-2">
            8. Contact
          </h2>
          <p>
            For any questions, contact us at{" "}
            <span className="font-semibold">support@pharmaplus.com</span>
          </p>
        </div>
      </div>

      <p className="mt-10 text-sm text-gray-500 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </section>
  );
}