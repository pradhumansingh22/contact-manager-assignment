import { useEffect, useState } from "react";
import { api } from "./api";
import { type Contact } from "./types";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      return "All fields are required";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Invalid email format";
    }
    if (form.phone.length < 7) {
      return "Phone number too short";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await api.put(`/contacts/${editingId}`, form);
      } else {
        await api.post("/contacts", form);
      }

      setForm({ name: "", email: "", phone: "" });
      setEditingId(null);
      fetchContacts();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Email already exists");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", email: "", phone: "" });
    setError("");
  };

  const deleteContact = async (id: number) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Contact Manager</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 flex-1"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 flex-1"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            className="bg-blue-600 text-white px-4 rounded"
            disabled={loading}
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </form>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Table */}
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.phone}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(c.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {contacts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No contacts
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
