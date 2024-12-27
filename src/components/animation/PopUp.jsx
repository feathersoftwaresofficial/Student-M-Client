import { message, Popconfirm } from "antd";
import React, { useState } from "react";

const usePopUp = () => {
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(true);

  const triggerPopUp = (status, messageText) => {
    setCondition(status);
    setOpen(true);
    if (status) {
      message.success(messageText);
    } else {
      message.error(messageText);
    }
    setTimeout(() => setOpen(false), 2000);
  };

  const PopUp = () => (
    <Popconfirm>
      <div />
    </Popconfirm>
  );

  return { triggerPopUp, PopUp };
};

export default usePopUp;
