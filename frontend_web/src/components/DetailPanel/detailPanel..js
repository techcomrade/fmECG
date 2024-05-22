import { forwardRef, useImperativeHandle, useState } from "react";
import { Drawer} from "antd";

const DrawerComponent = (props, ref) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);


  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
  }));

  return (
    <Drawer title="Basic Drawer" onClose={setIsOpen} open={isOpen}>
      {props.detailData}
      </Drawer>
  );
};

export const DrawerControlData = forwardRef(DrawerComponent);