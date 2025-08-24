import React from "react";

interface RefundPolicyProps {
  isDarkMode: boolean;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ isDarkMode }) => {
  return (
    <div
      className={`px-6 py-10 max-w-5xl mx-auto leading-relaxed md:my-36 transition-colors duration-300 $
        {isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Refund Policy</h1>

      <p className="mb-4">
        Thank you for shopping at paritosthrivedi.graphy.com
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Non-tangible irrevocable goods ("Digital products").</li>
        <li>We do not issue refunds for non-tangible irrevocable goods ("digital products") once the order is confirmed and the product is sent.</li>
        <li>We recommend contacting us for assistance if you experience any issues receiving or downloading our products. Contact us for any issues:</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Contact us for any issues:</h2>
      <p className="mb-4">
        If you have any questions about our Returns and Refunds Policy, please contact us at: <a href="mailto:hawc.rnd@gmail.com" className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} underline`}>hawc.rnd@gmail.com</a>
      </p>
    </div>
  );
};

export default RefundPolicy;
