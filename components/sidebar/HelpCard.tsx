import { Mail, Clock, MessageCircle } from "lucide-react";

export default function HelpCard() {
  return (
    <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-4 mb-6">
      {/* Icon + title inline */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4 text-amber-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Need Help?</h3>
      </div>

      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        Our support team is ready to assist with any submission questions.
      </p>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span className="text-xs">support@arcc.org</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span className="text-xs">Mon–Fri, 9 AM – 5 PM</span>
        </div>
      </div>
    </div>
  );
}
