import { Modal, Text } from "@nextui-org/react";
import { useState } from "react";

function getVisitedStatusFromLocalStorage() {
  const visited = localStorage.getItem("shampoodle:visited");
  if (visited === null) {
    return false;
  }
  return visited === "true";
}

function setVisitedStatusToLocalStorage() {
  localStorage.setItem("shampoodle:visited", "true");
}

export default function Welcome() {
  const [visible, setVisible] = useState(
    () => !getVisitedStatusFromLocalStorage()
  );
  const closeHandler = () => {
    setVisible(false);
    setVisitedStatusToLocalStorage();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="welcome-screen"
      open={visible}
      onClose={closeHandler}
      width="350px"
    >
      <Modal.Header>
        <Text size={18}>
          Welcome to{" "}
          <Text b size={18}>
            Shampoodle
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          Shampoodle is a platform to share your shower thoughts. Sign in, share
          your shower thoughts, and enjoy reading others&apos; shower thoughts
          😊.
        </Text>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
