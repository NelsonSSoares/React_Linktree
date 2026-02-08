import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useState } from "react";

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#f1f1f1");
    const [backgroundInput, setBackgroundInput] = useState("#121212");
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Link name: </label>
                <Input 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Type your link name"/>   
                <label className="text-white font-medium mt-2 mb-2">Link Url: </label>
                <Input 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Type your link url"
                />   

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Link Text Color: </label>
                        <input
                        value={textColorInput}
                        onChange={(e) => setTextColorInput(e.target.value)}
                        type="color"
                        />
                    </div>
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Link Background: </label>
                        <input
                        value={backgroundInput}
                        onChange={(e) => setBackgroundInput(e.target.value)}
                        type="color"
                        />
                    </div>
                </section>
                <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-2">See how it looks: </label>
                    <article 
                    style={{marginBottom: 8, marginTop:8, backgroundColor: backgroundInput}}
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3">
                        <p style={{ color: textColorInput}}>{nameInput}</p>
                    </article>
                </div>
            </form>
        </div>
    )
}