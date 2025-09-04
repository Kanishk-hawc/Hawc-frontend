import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiEye, FiDownload } from "react-icons/fi";

interface Payment {
  id: number;
  billFor: string;
  issueDate: string;
  dueDate: string;
  total: string;
  status: "Paid" | "Due" | "Cancel";
}

const payments: Payment[] = [
  { id: 4947, billFor: "Enterprize Year Subscription", issueDate: "10-05-2019", dueDate: "10-13-2019", total: "$599.00", status: "Due" },
  { id: 4904, billFor: "Maintenance Year Subscription", issueDate: "06-19-2019", dueDate: "06-26-2019", total: "$99.00", status: "Paid" },
  { id: 4829, billFor: "Enterprize Year Subscription", issueDate: "10-04-2018", dueDate: "10-12-2018", total: "$599.00", status: "Paid" },
  { id: 4830, billFor: "Enterprize Anniversary Subscription", issueDate: "12-04-2018", dueDate: "12-14-2018", total: "$399.00", status: "Paid" },
  { id: 4840, billFor: "Enterprize Coverage Subscription", issueDate: "12-08-2018", dueDate: "12-22-2018", total: "$99.00", status: "Cancel" },
  { id: 4844, billFor: "Manual Subscription Adjustments", issueDate: "12-08-2018", dueDate: "12-22-2018", total: "$99.00", status: "Paid" },
  { id: 4847, billFor: "Automatic Subscription Adjustments", issueDate: "12-08-2018", dueDate: "12-22-2018", total: "$99.00", status: "Paid" },
  { id: 4748, billFor: "Tiered Subscription", issueDate: "12-08-2018", dueDate: "12-22-2018", total: "$99.00", status: "Paid" },
];

const SubscriptionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "paymentHistory">("subscriptions");
  const history = useHistory();

  const handleViewPricing = () => history.push("/plan");

  const handleViewInvoice = () => {
    window.open("/sample_invoice.pdf"); // 👈 open in new tab
  };

  const handleDownloadInvoice = () => {
    const link = document.createElement("a");
    link.href = "/sample_invoice.pdf"; 
    link.download = "sample_invoice.pdf";
    link.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-sm text-gray-500">Manage Subscription</h2>
          <h1 className="text-3xl font-semibold text-gray-800">My Subscriptions</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeTab === "subscriptions"
              ? "Here is list of package/product that you have subscribed."
              : "Here is your payment history of account."}
          </p>
        </div>
        {activeTab === "subscriptions" && (
          <button
            className="px-4 py-2 border border-indigo-400 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
            onClick={handleViewPricing}
          >
            View Pricing
          </button>
        )}
      </div>

      {/* Navigation Tabs - Centered */}
      <div className="flex justify-center border-b border-gray-200 mb-6">
        <div className="flex">
          {(["subscriptions", "paymentHistory"] as const).map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === tab ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "subscriptions" ? "My Subscriptions" : "Payment History"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "subscriptions" ? (
        <>
          {/* Enterprise Plan */}
          <div className="border rounded-lg mb-4 p-6 flex justify-between items-center shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-indigo-600">Enterprise Plan</h2>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-500">Subscription ID: 100394949</p>

              <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                <p><span className="font-semibold text-gray-700">Started On:</span> Oct 12, 2018</p>
                <p><span className="font-semibold text-gray-700">Recurring:</span> Yes</p>
                <p><span className="font-semibold text-gray-700">Price:</span> $599.00</p>
                <p><span className="font-semibold text-gray-700">Access:</span> Unlimited</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="hidden" defaultChecked />
                  <div className="w-10 h-5 bg-indigo-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition"></div>
                  </div>
                  Auto Renew
                </label>
              </div>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                Change Plan
              </button>
              <p className="text-sm text-gray-500 mt-2">Next Billing on Oct 11, 2020</p>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg mb-4 p-6 flex justify-between items-center shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-indigo-600">Pro Plan</h2>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Expired</span>
              </div>
              <p className="text-sm text-gray-500">Subscription ID: 100142725</p>

              <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
                <p><span className="font-semibold text-gray-700">Started On:</span> Oct 12, 2017</p>
                <p><span className="font-semibold text-gray-700">Recurring:</span> Yes</p>
                <p><span className="font-semibold text-gray-700">Price:</span> $249.00</p>
                <p><span className="font-semibold text-gray-700">Access:</span> Up to 10 Members</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="hidden" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition"></div>
                  </div>
                  Auto Renew
                </label>
              </div>
              <button className="mt-4 px-4 py-2 border border-indigo-400 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                Renew Plan
              </button>
              <p className="text-sm text-gray-500 mt-2">You can renew the plan anytime.</p>
            </div>
          </div>

          {/* Support Section */}
          <div className="border rounded-lg p-6 flex justify-between items-center shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">We're here to help you!</h2>
              <p className="text-sm text-gray-500 mt-1">
                Ask a question or file a support ticket or report an issue. Our team support team will get back to you by email.
              </p>
            </div>
            <button className="px-4 py-2 border border-indigo-400 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
              Get Support Now
            </button>
          </div>
        </>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Bill For</th>
                <th className="px-6 py-3">Issue Date</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-indigo-600 font-medium">{payment.id}</td>
                  <td className="px-6 py-3">{payment.billFor}</td>
                  <td className="px-6 py-3">{payment.issueDate}</td>
                  <td className="px-6 py-3">{payment.dueDate}</td>
                  <td className="px-6 py-3 font-medium">{payment.total}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-semibold ${
                        payment.status === "Paid"
                          ? "text-green-500"
                          : payment.status === "Due"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      ● {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-3">
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={handleViewInvoice}
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={handleDownloadInvoice}
                      >
                        <FiDownload size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
