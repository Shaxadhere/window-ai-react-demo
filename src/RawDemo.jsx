import React, { useMemo, useState } from "react";
import { useWindowAI } from "window-ai-react";

const RawDemo = () => {
  const { error, generateText, isWindowAIInstalled, loading } = useWindowAI();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const onGenerate = async () => {
    const response = await generateText(text, (res) => {
      setResult((prev) => prev + " " + res.text);
    });
    setResult(response);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  const value = useMemo(() => {
    if (Array.isArray(result)) {
      return result?.at(0)?.text;
    }
    return result;
  }, [result]);

  return (
    <div
      className="flex p-10 gap-10 flex-col start"
      style={{
        maxWidth: 600,
        border: "1px solid #ccc",
        padding: 20,
        justifyContent: "start",
        textAlign: "left",
      }}
    >
      <a
        target="_blank"
        class=""
        href="https://chrome.google.com/webstore/detail/window-ai/cbhbgmdpcoelfdoihppookkijpmgahag"
      >
        <button class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 outline-offset-2 transition active:transition-none font-semibold bg-indigo-9 hover:bg-indigo-11 text-white text-md w-full h-full">
          Get the extension
        </button>
      </a>
      <div>loading:{JSON.stringify(loading)}</div>
      <div>Error:{JSON.stringify(error)}</div>
      <div>isWindowAIInstalled:{JSON.stringify(isWindowAIInstalled)}</div>
      <div>Result:{JSON.stringify(result)}</div>
      <p>{value}</p>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="ml-1" onClick={onGenerate}>
          Generate
        </button>
      </form>
    </div>
  );
};

export default RawDemo;
