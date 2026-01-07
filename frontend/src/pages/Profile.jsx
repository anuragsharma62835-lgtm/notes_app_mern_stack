import { useAuth } from "../Context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Profile</h1>

      <div className="space-y-4">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
