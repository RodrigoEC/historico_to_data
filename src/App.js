import { useRef, useState } from "react";
import upload from "./assets/upload.svg";
import loadingIcon from "./assets/loading.svg";
import "./App.css";
import { extract, extractFeatures } from "./pdftotext";

function App() {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState([]);
  const [status, setStatus] = useState("Please upload an Image");

  const handleChange = (e) => {
    inputRef.current = e.target.files[0];
    setDisabled(false);
  };

  const logging = (status) => {
    console.log(status);
    setStatus(status.status);
  };

  const extractData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const textData = await extract(inputRef.current, logging);
    const formatedData = extractFeatures(textData);
    console.log(formatedData);
    setText(formatedData);
    setLoading(false);
    setStatus("Done!");
  };

  return (
    <div className="App">
      <img src={upload} className="arrowIcon" alt="Arrow pointed up" />
      <form onSubmit={extractData}>
        <label>
          Enviar arquivos
          <input hidden type="file" ref={inputRef} onChange={handleChange} />
        </label>
        <input type="submit" disabled={disabled} value="Submit" />
      </form>
      <p className="status">{status}</p>
      {loading && (
        <img className="loading-icon" src={loadingIcon} alt="Loading icon" />
      )}
      <div className="extracted-text">
        {text.map((data) => (
          <p key={data.id}>
            <strong>{data.class}</strong> ({data.type}) - {data.status}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
