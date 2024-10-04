import { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer} from "antd";

const DrawerComponent = (props, ref) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [id,setId] = useState("")

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      setId(id)
    },
  }));

  return (
    <Drawer title="Basic Drawer" onClose={setIsOpen} open={isOpen}>
      {props.detailData}
      </Drawer>
  );
};

export const DrawerControlData = forwardRef(DrawerComponent);