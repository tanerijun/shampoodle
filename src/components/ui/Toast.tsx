import { toast as reactHotToast } from "react-hot-toast";

export default function Toast(message: string) {
  reactHotToast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#26292B",
      color: "#ECEDEE",
    },
  });
}
