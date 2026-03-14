
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[var(--cream)] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[var(--brown-dark)] mb-6">
          Privacy Policy
        </h1>

        {/* 1 Introduction */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            1. Introduction
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use
            our platform.
          </p>

          <p className="text-gray-700 mt-2 leading-relaxed">
            This policy complies with the <strong>Kenya Data Protection Act, 2019</strong>.
          </p>
        </section>

        {/* 2 Information We Collect */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            2. Information We Collect
          </h2>

          <p className="text-gray-700 mb-2">
            When you register or use the platform, we may collect the following information:
          </p>

          <p className="font-medium text-gray-800">Personal Information:</p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Gender</li>
            <li>Account password (stored securely)</li>
          </ul>

          <p className="font-medium text-gray-800">Usage Information:</p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Login activity</li>
            <li>Platform interactions</li>
            <li>Device and browser information</li>
          </ul>
        </section>

        {/* 3 How We Use Your Information */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            3. How We Use Your Information
          </h2>

          <p className="text-gray-700 mb-2">
            We use collected data to:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Create and manage user accounts</li>
            <li>Allow participation in chama activities</li>
            <li>Improve platform functionality</li>
            <li>Communicate important updates</li>
            <li>Ensure platform security</li>
          </ul>

          <p className="text-gray-700 mt-2">
            We do <strong>not sell personal data to third parties</strong>.
          </p>
        </section>

        {/* 4 Data Storage */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            4. Data Storage and Security
          </h2>

          <p className="text-gray-700 mb-2">
            Your data is stored securely using modern security practices.
          </p>

          <p className="text-gray-700 mb-2">
            Our services are hosted using third-party infrastructure providers including:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>Render</strong> for backend hosting</li>
            <li><strong>Netlify</strong> for frontend hosting</li>
          </ul>

          <p className="text-gray-700 mt-3">
            These providers implement security measures designed to protect user data.
          </p>

          <p className="text-gray-700 mt-2">
            We also implement safeguards such as:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Encrypted connections (HTTPS)</li>
            <li>Restricted database access</li>
            <li>Secure password storage</li>
          </ul>
        </section>

        {/* 5 Data Sharing */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            5. Data Sharing
          </h2>

          <p className="text-gray-700 mb-2">
            We may share information only when necessary:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>To comply with legal obligations</li>
            <li>To enforce our Terms and Conditions</li>
            <li>With infrastructure providers required to operate the platform</li>
          </ul>

          <p className="text-gray-700 mt-2">
            We do <strong>not share personal data for advertising purposes</strong>.
          </p>
        </section>

        {/* 6 Data Retention */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            6. Data Retention
          </h2>

          <p className="text-gray-700 mb-2">
            We retain personal data only for as long as necessary to:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Maintain user accounts</li>
            <li>Provide platform services</li>
            <li>Meet legal obligations</li>
          </ul>

          <p className="text-gray-700 mt-2">
            Users may request deletion of their accounts and associated data.
          </p>
        </section>

        {/* 7 User Rights */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            7. Your Rights
          </h2>

          <p className="text-gray-700 mb-2">
            Under the <strong>Kenya Data Protection Act</strong>, users have the right to:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Access their personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of their data</li>
            <li>Object to processing of their data</li>
            <li>Request restriction of processing</li>
          </ul>

          <p className="text-gray-700 mt-2">
            Requests can be submitted using the contact information below.
          </p>
        </section>

        {/* 8 Cookies */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            8. Cookies and Tracking(Future Implementation.)
          </h2>

          <p className="text-gray-700 mb-2">
            The platform may use basic cookies or session technologies necessary for:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Authentication</li>
            <li>Maintaining user sessions</li>
            <li>Improving user experience</li>
          </ul>

          <p className="text-gray-700 mt-2">
            These technologies do not collect sensitive personal information.
          </p>
        </section>

        {/* 9 Third Party */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            9. Third-Party Services
          </h2>

          <p className="text-gray-700 mb-2">
            The platform may rely on third-party services such as:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Hosting infrastructure</li>
            <li>Email communication systems</li>
          </ul>

          <p className="text-gray-700 mt-2">
            These providers may process limited user data only as necessary to provide their services.
          </p>
        </section>

        {/* 10 Contact */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--brown-dark)] mb-2">
            10. Contact Information
          </h2>

          <p className="text-gray-700">
            If you have questions regarding this Privacy Policy or your personal data,
            you may contact us at:
          </p>

          <p className="text-gray-700 mt-2">
            Email: <strong>nataliegichuki@gmail.com</strong>
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
