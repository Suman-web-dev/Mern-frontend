import { Plus, Trash2, Edit2 } from "lucide-react";
import { CoAuthor } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CoAuthorTableProps {
  coAuthors: CoAuthor[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof CoAuthor, value: string) => void;
}

export default function CoAuthorTable({ coAuthors, onAdd, onRemove, onUpdate }: CoAuthorTableProps) {
  return (
    <div className="space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-900 break-words">Co-Authors</h3>
        <Button onClick={onAdd} size="sm" variant="outline" className="flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Co-author
        </Button>
      </div>

      {coAuthors.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No co-authors added yet</p>
        </div>
      ) : (
        <div className="space-y-4 w-full min-w-0">
          {coAuthors.map((coAuthor, index) => (
            <div key={coAuthor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 w-full min-w-0">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 break-words">Co-Author {index + 1}</span>
                <div className="flex space-x-2 flex-shrink-0">
                  <button
                    onClick={() => onRemove(coAuthor.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={coAuthor.name}
                    onChange={(e) => onUpdate(coAuthor.id, 'name', e.target.value)}
                    placeholder="Full name"
                    className="w-full"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={coAuthor.email}
                    onChange={(e) => onUpdate(coAuthor.id, 'email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <Input
                    value={coAuthor.institution}
                    onChange={(e) => onUpdate(coAuthor.id, 'institution', e.target.value)}
                    placeholder="Institution name"
                    className="w-full"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <Input
                    value={coAuthor.country}
                    onChange={(e) => onUpdate(coAuthor.id, 'country', e.target.value)}
                    placeholder="Country"
                    className="w-full"
                  />
                </div>
                <div className="sm:col-span-2 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">ORCID (Optional)</label>
                  <Input
                    value={coAuthor.orcid}
                    onChange={(e) => onUpdate(coAuthor.id, 'orcid', e.target.value)}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
