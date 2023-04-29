import { Modal, Text } from "@nextui-org/react";
import { useState } from "react";

export default function Welcome() {
  const [visible, setVisible] = useState(true);
  const closeHandler = () => setVisible(false);

  return (
    <Modal
      closeButton
      aria-labelledby="welcome-screen"
      open={visible}
      onClose={closeHandler}
      width="fit-content"
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
        <Text>Shampoodle is a platform to share your shower thoughts.</Text>
        <Text>Sign in and leave your shower thoughts for everyone else.</Text>
        <Text>Looking forward to have your shower thoughts here 😊.</Text>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
