import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  background: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundInput, setBackgroundInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  function handleRegister(event: FormEvent): void {
    event.preventDefault();
    if (nameInput === "" || urlInput === "") return;

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      textColor: textColorInput,
      background: backgroundInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
  }

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          textColor: doc.data().textColor,
          background: doc.data().background,
        });
      });
      setLinks(list); 
    });
    return () => unsub();
  }, []);

  async function handleDeleteLink(id: string): Promise<void> {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef)
      .then(() => {        
        console.log("Document successfully deleted!");
      }) 
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        className="flex flex-col mt-3 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Link name: </label>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Type your link name"
        />
        <label className="text-white font-medium mt-2 mb-2">Link Url: </label>
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Type your link url"
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Link Text Color:{" "}
            </label>
            <input
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
              type="color"
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Link Background:{" "}
            </label>
            <input
              value={backgroundInput}
              onChange={(e) => setBackgroundInput(e.target.value)}
              type="color"
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2">
              See how it looks:{" "}
            </label>
            <article
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundInput,
              }}
              className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7"
        >
          Add Link
        </button>
      </form>

      <h2 className="font-bold text-white text-2xl">My Links</h2>
        {links.map((link) => (
        <article
        key={link.id}
        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: link.background, color: link.textColor }}
      >
        <p>{link.name}</p>
        <div>
          <button className="border border-dashed p-1 rounded-md bg-neutral-900"
          onClick={()=>handleDeleteLink(link.id)}
          >
            <FiTrash size={18} color="#fff" />
          </button>
        </div>
      </article>
        ))}
    </div>
  );
}
