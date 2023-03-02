export function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  export function handleError(error, setShowError, setErrorMessage) {
    console.log(error);
    let message = Object.values(error.response.data)[0];
    setShowError(true);
    if (message) {
      setErrorMessage(message);
    } else {
      setErrorMessage("Не удалось внести информацию");
    }
  };