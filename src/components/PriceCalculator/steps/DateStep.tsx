
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateStepProps {
  preferredDate?: Date;
  setPreferredDate: (date: Date | undefined) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const DateStep: React.FC<DateStepProps> = ({
  preferredDate,
  setPreferredDate,
  onPrevStep,
  onNextStep
}) => {
  const isDateSelected = Boolean(preferredDate);

  return (
    <>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">When do you need service?</h3>
            <p className="text-gray-500 text-sm mb-4">
              Select a preferred date for your service. We'll confirm availability when we contact you.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !preferredDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferredDate ? format(preferredDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={preferredDate}
                  onSelect={setPreferredDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date(new Date().setDate(new Date().getDate() - 1)) // Can't select past dates
                  }
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mt-2">
                {preferredDate 
                  ? `You selected: ${format(preferredDate, "MMMM d, yyyy")}`
                  : "No date selected yet"}
              </p>
              
              <Button
                variant="ghost"
                className="text-sm mt-2"
                onClick={() => setPreferredDate(undefined)}
                disabled={!preferredDate}
              >
                Clear selection
              </Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full mt-4">
              <h4 className="font-medium text-amber-800 mb-1">Need service ASAP?</h4>
              <p className="text-sm text-amber-700">
                No problem! You can continue without selecting a date or call us directly at (778) 808-7620 for urgent requests.
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between mt-6 px-6 pt-0">
        <Button 
          variant="outline" 
          onClick={onPrevStep}
        >
          Previous
        </Button>
        <Button 
          onClick={onNextStep}
        >
          Continue
        </Button>
      </CardFooter>
    </>
  );
};

export default DateStep;
