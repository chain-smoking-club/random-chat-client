import useMessages from "../hooks/useMessages";

const ChatMessages = () => {
  const { messages } = useMessages();

  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
};

export default ChatMessages;
