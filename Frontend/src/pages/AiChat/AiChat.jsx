import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AiChat.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TypingLoader } from "../../components/TypingLoader/TypingLoader";
import { useAiChat } from "../../hooks/useAiChat";
export const AiChat = () => {

  
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [placeholder, setPlaceholder] = useState(true);

  // useAIChat Hook
  const { mutate: askAI, isPending } = useAiChat();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    askAI(question, {
      onSuccess: (data) => {
        setPlaceholder(false);
        setResponse(data);
        setFailedMessage("");
      },
      onError: () => setFailedMessage("Try again!"),
    });
  };

  return (
    <div className="aichat-section">
      <div className="aichat-container">
        <div className="aichat-res">
          {placeholder && (
            <div className="aichat-placeholder">
              <h1>What's in your mind ?</h1>
            </div>
          )}
          {isPending ? (
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
