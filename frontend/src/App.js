import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [toast, setToast] = useState("");

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    setContacts(await res.json());
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE",
    });

    setToast("Contact deleted successfully");
    fetchContacts();

    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app">
      {toast && <div className="toast">{toast} ✅</div>}

      <h1 className="title">Contact Manager</h1>

      <div className="layout">
        <ContactForm fetchContacts={fetchContacts} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
}

export default App;