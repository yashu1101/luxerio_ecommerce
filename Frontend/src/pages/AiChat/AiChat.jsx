import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AiChat.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/axios";
import { useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { TypingLoader } from "../../components/TypingLoader/TypingLoader";
export const AiChat = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(true);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setPlaceholder(false);
    try {
      setLoading(true);
      const res = await api.post("chat", {
        AiQuestion: question,
      });

      setResponse(res.data?.AiAnswer);
    } catch (error) {
      console.log(error.response.data.message || "Somthing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  console.log(response);

  // if (loading) {
  //   return (
  //     <div className="aichat-res">
  //       <Loader height={"100px"}></Loader>
  //     </div>
  //   );
  // }
  return (
    <div className="aichat-section">
      <div className="aichat-container">
        <div className="aichat-res">
          {placeholder && (
            <div className="aichat-placeholder">
              <h1>What's in your mind ?</h1>
              
            </div>
          )}
          {loading ? (
            // <Loader height={"100px"}></Loader>
            <TypingLoader> </TypingLoader>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}
        </div>
        <div className="aichat-que">
          <form className="aichat-form" onSubmit={handleOnSubmit}>
            <div className="aichat-field-wrapper">
              <input
                type="text"
                value={question}
                className="aichat-que-field"
                placeholder="Ask anything"
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button type="submit" className="aichat-submit-button">
                <FontAwesomeIcon
                  className="aichat-submit-button-icon"
                  icon={faPaperPlane}></FontAwesomeIcon>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
