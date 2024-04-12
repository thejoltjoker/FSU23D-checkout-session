const Loading = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <h6 className="mx-auto animate-pulse text-center text-4xl text-brown-950">
        <span className="font-emoji-color">🍌</span> <br /> Loading
      </h6>
    </div>
  );
};

export default Loading;
