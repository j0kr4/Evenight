"use client";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const PartyForm = () => {
  const [adress, setAdress] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [boardGames, setBoardGames] = useState("");
  const [videoGames, setVideoGames] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [bringSnacks, setBringSnacks] = useState("");
  const [bringDrinks, setBringDrinks] = useState("");
  const [bringDrinksAlcool, setBringDrinksAlcool] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [place, setPlace] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");

  const mutation = useMutation({
    mutationKey: ["party"],
    mutationFn: (newTodo) => {
      return axios.post("/api/party", newTodo);
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    const partyDetails = {
      name,
      type,
      date,
      time,
      description,
      availableSeats,
      isPaid,
      place,
      price,
      adress,
      boardGames,
      videoGames,
      organizer,
      bringSnacks,
      bringDrinks,
      bringDrinksAlcool,
    };


    mutation.mutate(partyDetails);
  }
  return (
    <div className="max-w-4xl m-auto">
      <form onSubmit={onSubmit} className="grid gap-6 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" placeholder="Enter event name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select onValueChange={(value) => setType(value)} id="type">
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
          <Input
            onChange={(e) => setAdress(e.target.value)}
            id="address"
            placeholder="Enter event address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Describe the event"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              onChange={(e) => setCapacity(e.target.value)}
              id="capacity"
              type="number"
              placeholder="Enter capacity"
            />
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
            <Input
              onChange={(e) => setLocation(e.target.value)}
              id="location"
              placeholder="Enter location"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="number"
              placeholder="Enter price"
            />
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
          <Select
            onValueChange={(value) => setSelectedPerson(value)}
            id="organizer"
          >
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
        <Button>Create Event</Button>
      </form>
    </div>
  );
};
export default PartyForm;
