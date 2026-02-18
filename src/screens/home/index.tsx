import { SocialFooter } from "../../components/SocialFooter";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  background: string;
}
interface SocialLinksProps {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}
export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef).then((snapshot) => {
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
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data()) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            linkedin: snapshot.data()?.linkedin,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl text-white font-bold mt-20">HOME</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.background, color: link.textColor }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p
                style={{ color: link.textColor }}
                className="text-base md:text-lg"
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <SocialFooter url={socialLinks.facebook}>
              <FaFacebook size={35} color="#fff" />
            </SocialFooter>
            <SocialFooter url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </SocialFooter>
            <SocialFooter url={socialLinks.youtube}>
              <FaYoutube size={35} color="#fff" />
            </SocialFooter>
            <SocialFooter url={socialLinks.linkedin}>
              <FaLinkedinIn size={35} color="#fff" />
            </SocialFooter>
          </footer>
        )}
      </main>
    </div>
  );
}
