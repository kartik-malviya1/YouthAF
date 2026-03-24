import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getMedia,
  saveMedia,
  updateMedia,
  deleteMedia,
  getMembers,
  saveMembers,
  updateMembers,
  deleteMembers,
} from "../utils/storage";
import Editor from "../components/Editor";

/* ================= MAIN ================= */

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-zinc-50 pt-24">

      {/* SIDEBAR */}
      <div className="w-64 hidden md:flex flex-col bg-zinc-950 text-white p-6">
        <h2 className="text-xl font-black mb-10">YouthAid CMS</h2>

        {["dashboard", "media", "members"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-left px-4 py-2 rounded mb-2 capitalize ${
              activeTab === tab ? "bg-red-500" : "hover:bg-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "media" && <MediaManager />}
        {activeTab === "members" && <MemberManager />}
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard() {
  const [media, setMedia] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaData = await getMedia();
        const membersData = await getMembers();
        setMedia(mediaData);
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setMedia([]);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Total Posts" value={media.length} />
        <Card title="Blogs" value={media.filter(m => m.type === "blog").length} />
        <Card title="News" value={media.filter(m => m.type === "news").length} />
        <Card title="Members" value={members.length} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-sm text-zinc-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

/* ================= MEDIA ================= */

function MediaManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "blog",
    image: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getMedia();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching media posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openAdd = () => {
    setForm({ title: "", content: "", type: "blog", image: "" });
    setEditId(null);
    setShowModal(true);
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    try {
      let updated;

      if (editId) {
        await updateMedia(editId, form);
        updated = posts.map(p =>
          p.id === editId ? { ...p, ...form } : p
        );
      } else {
        await saveMedia({ ...form, date: new Date() });
        updated = [
          { ...form, id: Date.now().toString(), date: new Date() },
          ...posts,
        ];
      }

      setPosts(updated);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500">Loading media...</div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Media Manager</h1>

        <button
          onClick={openAdd}
          className="bg-red-500 text-white px-5 py-2 rounded-full"
        >
          + Add Post
        </button>
      </div>

      {/* POSTS */}
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow">

            <img src={p.image} className="h-40 w-full object-cover" />

            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>

              <div className="flex gap-3 mt-2 text-sm">
                <button onClick={() => handleEdit(p)} className="text-blue-500">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-5xl p-8 rounded-3xl shadow-2xl space-y-6"
          >

            {/* TITLE */}
            <input
              placeholder="Enter Title..."
              className="w-full text-3xl font-bold outline-none border-b pb-2"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            {/* TOP BAR */}
            <div className="flex justify-between items-center">
              <select
                className="border px-3 py-2 rounded-lg"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              >
                <option value="blog">Blog</option>
                <option value="news">News</option>
                <option value="video">Video</option>
              </select>

              <button
                onClick={save}
                className="bg-red-500 text-white px-6 py-2 rounded-full"
              >
                {editId ? "Update" : "Publish"}
              </button>
            </div>

            {/* EDITOR */}
            <Editor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
            />

            {/* IMAGE */}
            <div className="border-dashed border-2 border-zinc-300 p-4 rounded-xl text-center">
              <input
                type="file"
                onChange={e => handleImage(e.target.files[0])}
              />

              {form.image && (
                <img
                  src={form.image}
                  className="h-40 mx-auto mt-4 rounded-lg object-cover"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-zinc-200 rounded-full"
              >
                Cancel
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}

/* ================= MEMBERS ================= */

function MemberManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getMembers();
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const openAdd = () => {
    setMember({ name: "", role: "", image: "" });
    setEditId(null);
    setShowModal(true);
  };

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setMember(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    try {
      let updated;

      if (editId) {
        await updateMembers(editId, member);
        updated = members.map(m =>
          m.id === editId ? { ...m, ...member } : m
        );
      } else {
        await saveMembers({ ...member });
        updated = [{ ...member, id: Date.now().toString() }, ...members];
      }

      setMembers(updated);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEdit = (m) => {
    setMember(m);
    setEditId(m.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMembers(id);
      const updated = members.filter(m => m.id !== id);
      setMembers(updated);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-500">Loading members...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Members</h1>

        <button
          onClick={openAdd}
          className="bg-red-500 text-white px-4 py-2 rounded-full"
        >
          + Add Member
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-xl shadow text-center">

            <img
              src={m.image}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />

            <h3>{m.name}</h3>
            <p className="text-sm text-zinc-500">{m.role}</p>

            <div className="flex justify-center gap-3 mt-3 text-sm">
              <button onClick={() => handleEdit(m)} className="text-blue-500">
                Edit
              </button>

              <button onClick={() => handleDelete(m.id)} className="text-red-500">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

          <input
            placeholder="Name"
            className="input"
            value={member.name}
            onChange={e => setMember({...member, name:e.target.value})}
          />

          <input
            placeholder="Role"
            className="input"
            value={member.role}
            onChange={e => setMember({...member, role:e.target.value})}
          />

          <input
            type="file"
            onChange={e => handleImage(e.target.files[0])}
          />

          {member.image && (
            <img
              src={member.image}
              className="h-20 mt-2 rounded-full mx-auto"
            />
          )}

          <button
            onClick={save}
            className="bg-red-500 text-white px-6 py-2 rounded mt-4"
          >
            {editId ? "Update" : "Add"}
          </button>

        </Modal>
      )}

    </div>
  );
}

/* ================= MODAL ================= */

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50">

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white p-8 rounded-3xl w-full max-w-xl space-y-4"
      >
        {children}

        <button onClick={onClose} className="text-sm text-zinc-500">
          Close
        </button>
      </motion.div>

    </div>
  );
}
