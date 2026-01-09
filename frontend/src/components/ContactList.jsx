export default function ContactList({ contacts, deleteContact }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <button onClick={() => deleteContact(c._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}