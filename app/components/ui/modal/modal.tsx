import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";


interface ModalProps{
    open: boolean;
    size: any;
    message: string;
    funcion: any;
}

export function DialogBox({open, size, message, funcion}:ModalProps) {

  return (
    <>
      <Dialog
              open={open}
              size={size}
              handler={funcion}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <DialogHeader  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Typography variant="h4" color="light-green" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>TicsCode Ecuador</Typography>
            </DialogHeader>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Typography variant="h5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{message}</Typography>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          
          <Button
                      variant="gradient"
                      color="light-green"
                      onClick={funcion} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}