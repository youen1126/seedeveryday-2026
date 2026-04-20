import { useSelector } from "react-redux";

export default function MessageToast() {
  const messages = useSelector((state) => state.message);

  return (
    <div className="toast-container brand-toast-container position-fixed top-0 end-0 p-3">
      {messages.map((message) => {
        const stateClass =
          message.type === "success" ? "is-success" : "is-danger";
        return (
          <div
            key={message.id}
            className={`toast show brand-toast ${stateClass}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body brand-toast-body font-zh-display">
              {message.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
