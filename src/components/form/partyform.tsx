import { Button } from "../ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const PartyForm = () => {
  return (
    <div className="max-w-4xl m-auto">
      <form className="grid gap-6 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" placeholder="Enter event name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select id="type">
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="soiree">Soirée</SelectItem>
                <SelectItem value="rassemblement">Rassemblement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter event address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe the event" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input id="capacity" type="number" placeholder="Enter capacity" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox id="paid" />
              Paid Event
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Enter location" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter price" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Board Games</Label>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Input placeholder="Add board game" />
              <Button variant="ghost" size="icon">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>Monopoly</div>
              <Button variant="ghost" size="icon">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>Catan</div>
              <Button variant="ghost" size="icon">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Video Games</Label>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Input placeholder="Add video game" />
              <Button variant="ghost" size="icon">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>Super Smash Bros</div>
              <Button variant="ghost" size="icon">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>Mario Kart</div>
              <Button variant="ghost" size="icon">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="organizer">Organizer</Label>
          <Select id="organizer">
            <SelectTrigger>
              <SelectValue placeholder="Select organizer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="bob">Bob Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox id="allow-snacks" />
              Allow Snacks
            </Label>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox id="allow-drinks" />
              Allow Drinks
            </Label>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox id="allow-alcohol" />
              Allow Alcohol
            </Label>
          </div>
        </div>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
};
export default PartyForm;
