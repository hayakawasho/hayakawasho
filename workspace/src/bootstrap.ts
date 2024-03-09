export const bootstrap = (initialize: () => void) => {
  if (document.readyState !== "loading") {
    initialize();
  }

  const onReadyStateChange = () => {
    switch (document.readyState) {
      case "interactive": {
        document.removeEventListener("readystatechange", onReadyStateChange);
        initialize();
        break;
      }
      case "loading":
      case "complete": {
        //
      }
    }
  };

  document.addEventListener("readystatechange", onReadyStateChange);
};
