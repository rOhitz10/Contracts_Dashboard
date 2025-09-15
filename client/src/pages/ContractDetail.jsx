import { useParams } from "react-router-dom";
import contractsData from "../../public/Contracts.json";
import { AlertCircle,CheckCircle,Clock,XCircle,AlertTriangle,Info,FileText} from "lucide-react";

export const ContractDetail = () => {
  const { id } = useParams();
  const contract = contractsData.find((c) => String(c.id) === id);

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

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case "High":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "Medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "Low":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
       <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
       <div className="bg-gray-50 px-4 py-3 border-b">
      <h2 className="text-xl font-semibold mb-2">Clauses</h2>
       </div>
      <div className="grid gap-3 mb-6 p-4">
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
        </div>

      {/* AI Insights Section */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">AI Risk Analysis</h2>
          <p className="text-sm text-gray-600">Potential risks identified by AI analysis</p>
        </div>
        
        <div className="p-4 space-y-4">
          {contract.insights?.map((insight, i) => (
            <div key={i} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1 mr-3">
                {getRiskIcon(insight.risk)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900">{insight.message}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(insight.risk)}`}>
                    {insight.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {insight.risk === "High" 
                    ? "Immediate attention recommended" 
                    : insight.risk === "Medium" 
                    ? "Review recommended" 
                    : "For your awareness"}
                </p>
              </div>
            </div>
          ))}
          
          {(!contract.insights || contract.insights.length === 0) && (
            <div className="text-center py-6 text-gray-500">
              <Info className="h-8 w-8 mx-auto mb-2" />
              <p>No AI insights available for this contract</p>
            </div>
          )}
        </div>
      </div>

      {/* Improved Evidence Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Supporting Evidence</h2>
            <p className="text-sm text-gray-600">Document excerpts supporting the AI analysis</p>
          </div>
         
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contract.evidence?.slice(0, 2).map((ev, i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {ev.source}
                </span>
                <span className="text-xs font-medium text-blue-600">
                  {Math.round(ev.relevance * 100)}% Relevant
                </span>
              </div>
              <p className="text-sm text-gray-700 italic">"{ev.snippet}"</p>
            </div>
          ))}
        </div>
        
        {contract.evidence?.length > 2 && (
          <p className="text-sm text-gray-500 mt-3">
            +{contract.evidence.length - 2} more evidence snippets available
          </p>
        )}
        
        {(!contract.evidence || contract.evidence.length === 0) && (
          <div className="text-center py-4 text-gray-500">
            <FileText className="h-8 w-8 mx-auto mb-2" />
            <p>No evidence available for this contract</p>
          </div>
        )}
      </div>

      
    </div>
  );
};