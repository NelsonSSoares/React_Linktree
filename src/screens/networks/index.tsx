import { useState } from "react";
import { Header } from "../../components/Header";
import {db } from "../../services/firebaseConnection";
import { setDoc, doc } from "firebase/firestore";
import { Input } from "../../components/Input";

export function Networks() {
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
        facebook: facebookLink,
        instagram: instagramLink,
        linkedin: linkedinLink,
        youtube: youtubeLink
    })
    .then(() => {
        alert("Link saved successfully!");

    }).catch((error) => {
        alert("Error saving link: ", error);
    });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">My Networks</h1>
      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">
          Facebook Link
        </label>
        <Input
          type="url"
          placeholder="Type your Facebook url.."
          value={facebookLink}
          onChange={(e) => setFacebookLink(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Instagram Link
        </label>
        <Input
          type="url"
          placeholder="Type your Instagram url.."
          value={instagramLink}
          onChange={(e) => setInstagramLink(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          LinkedIn Link
        </label>
        <Input
          type="url"
          placeholder="Type your LinkedIn url.."
          value={linkedinLink}
          onChange={(e) => setLinkedinLink(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">YouTube Link</label>
        <Input
          type="url"
          placeholder="Type your YouTube url.."
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />

        <button type="submit" className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium">
            Save Link
        </button>
      </form>
    </div>
  );
}
