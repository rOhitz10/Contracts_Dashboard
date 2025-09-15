import { useParams } from "react-router-dom";
import contractsData from "../../public/Contracts.json";
import { useState } from "react";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

export const ContractDetail = () => {
  const { id } = useParams();
  const contract = contractsData.find((c) => String(c.id) === id);

  const [showEvidence, setShowEvidence] = useState(false);

  if (!contract) return <p className="p-6 text-red-500">Contract not found</p>;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Expired":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Renewal due":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      {/* Metadata */}
      <h1 className="text-2xl font-bold mb-4">{contract.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div><strong>Parties:</strong> {contract.parties}</div>
        <div><strong>Start Date:</strong> {contract.start}</div>
        <div><strong>Expiry Date:</strong> {formatDate(contract.expiry)}</div>
        <div className="flex items-center gap-2">
          <strong>Status:</strong> {getStatusIcon(contract.status)} {contract.status}
        </div>
        <div>
          <strong>Risk Score:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
              ${
                contract.risk === "High"
                  ? "bg-red-100 text-red-700"
                  : contract.risk === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
          >
            {contract.risk}
          </span>
        </div>
      </div>

      {/* Clauses Section */}
      <h2 className="text-xl font-semibold mb-2">Clauses</h2>
      <div className="grid gap-3 mb-6">
        {contract.clauses?.map((clause,index) => (
          <div key={index} className="border rounded p-3 shadow-sm">
            <h3 className="font-medium">{clause.title}</h3>
            <p className="text-sm text-gray-600">{clause.summary}</p>
            <p className="text-xs text-gray-500 mt-1">
              Confidence: {clause.confidence}%
            </p>
          </div>
        ))}
      </div>

      {/* AI Insights Section */}
      <h2 className="text-xl font-semibold mb-2">AI Insights</h2>
      <ul className="space-y-2 mb-6">
        {contract.insights?.map((insight, i) => (
          <li
            key={i}
            className="p-3 border rounded flex justify-between items-center"
          >
            <span>{insight.text}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
                ${
                  insight.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : insight.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
              {insight.severity}
            </span>
          </li>
        ))}
      </ul>

      {/* Evidence Drawer Trigger */}
      <button
        onClick={() => setShowEvidence(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Evidence
      </button>

      {/* Evidence Side Drawer */}
      {showEvidence && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="w-96 bg-white p-6 shadow-lg h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Evidence</h3>
              <button
                className="text-gray-500"
                onClick={() => setShowEvidence(false)}
              >
                ✕
              </button>
            </div>
            {contract.evidence?.map((ev, i) => (
              <div key={i} className="mb-3 p-3 border rounded">
                <p className="text-sm">{ev.snippet}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Relevance: {ev.relevance}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
