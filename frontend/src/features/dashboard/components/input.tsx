import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DebouncedSearchInputProps {
  initialValue: string;
  onDebounce: (value: string) => void;
  delay?: number;
}

export function DebouncedSearchInput({
  initialValue,
  onDebounce,
  delay = 400,
}: DebouncedSearchInputProps) {
  const [value, setValue] = useState(initialValue);

  // Sync internal state if the URL changes externally (e.g., browser Back button)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Handle the debounce logic locally
  useEffect(() => {
    const timer = setTimeout(() => {
      onDebounce(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, onDebounce, delay]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search order code, customer, email..."
        type="text"
        className="pl-9"
        value={value}
        onChange={(e) => setValue(e.target.value)} // 🚀 ONLY re-renders this tiny input component!
      />
    </div>
  );
}
