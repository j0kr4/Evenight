import React from "react";
import { Label } from "./../ui/label";
import { Input } from "./../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./../ui/popover";
import { Button } from "./../ui/button";
import { Calendar } from "./../ui/calendar";
import { Slider } from "./../ui/slider";
import { CalendarDaysIcon } from "lucide-react";

export function DateTimePiker() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="datetime">Sélectionnez une date et une heure</Label>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start font-normal"
            >
              <CalendarDaysIcon className="h-4 w-4" />
              <span>Choisir une date et une heure</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="grid gap-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Calendar mode="single" />
                <div className="grid gap-2">
                  <Label htmlFor="time">Heure</Label>
                  <Slider
                    id="time"
                    defaultValue={[
                      new Date().getHours() * 60 + new Date().getMinutes(),
                    ]}
                    max={24 * 60}
                    step={15}
                    className="[&_[role=slider]]:h-1 [&_[role=slider]]:rounded-full [&_[role=slider]]:bg-primary [&_[role=slider]]:focus:ring-2 [&_[role=slider]]:focus:ring-primary"
                    aria-label="Sélectionnez l'heure"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Valider</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Input
          id="datetime"
          type="datetime-local"
          className="flex-1"
          placeholder="JJ/MM/AAAA HH:MM"
        />
      </div>
    </div>
  );
}
