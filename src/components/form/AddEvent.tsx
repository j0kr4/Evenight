import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const AddEvent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Plus />
          Ajouter un événement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vous voulez ajouter de evenement</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddEvent;
